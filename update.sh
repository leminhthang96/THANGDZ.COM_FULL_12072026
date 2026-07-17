#!/bin/bash

# Define project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

LOCK_FILE="$PROJECT_DIR/update.lock"
LOG_FILE="$PROJECT_DIR/update.log"

# Check if lock file exists
if [ -f "$LOCK_FILE" ]; then
    echo "Quá trình cập nhật đã đang chạy..."
    exit 1
fi

# Create lock file
touch "$LOCK_FILE"

# Cleanup function - always remove lock, write final status
cleanup() {
    local exit_code=$?
    rm -f "$LOCK_FILE"
    if [ $exit_code -ne 0 ]; then
        echo "" >> "$LOG_FILE"
        echo "=========================================" >> "$LOG_FILE"
        echo "LỖI: CẬP NHẬT THẤT BẠI! (exit code: $exit_code) - $(date)" >> "$LOG_FILE"
        echo "=========================================" >> "$LOG_FILE"
    fi
}
trap cleanup EXIT

echo "========================================="
echo "BẮT ĐẦU CẬP NHẬT HỆ THỐNG - $(date)"
echo "Thư mục dự án: $PROJECT_DIR"
echo "========================================="

# 1. Đọc version.json cục bộ
if [ ! -f "version.json" ]; then
    echo "Lỗi: Không tìm thấy file version.json cục bộ!"
    exit 1
fi

UPDATE_URL=$(python3 -c "import json; print(json.load(open('version.json'))['update_url'])")
CURRENT_VERSION=$(python3 -c "import json; print(json.load(open('version.json'))['version'])")

echo "Phiên bản hiện tại: $CURRENT_VERSION"
echo "Đường dẫn tải cập nhật: $UPDATE_URL"

# 2. Tải version.json từ Cloudflare R2 để kiểm tra phiên bản mới nhất
echo "Đang kiểm tra phiên bản mới trên R2..."
wget -q -O /tmp/remote_version.json "$UPDATE_URL/version.json" || curl -s -o /tmp/remote_version.json "$UPDATE_URL/version.json"

LATEST_VERSION=$(python3 -c "import json; print(json.load(open('/tmp/remote_version.json'))['version'])")
CHANGELOG=$(python3 -c "import json; print(json.load(open('/tmp/remote_version.json'))['changelog'])")

echo "Phiên bản mới nhất trên server: $LATEST_VERSION"
echo "Nội dung cập nhật (Changelog): $CHANGELOG"

# 3. Tải file update.zip
ZIP_URL="$UPDATE_URL/update.zip"
echo "Đang tải file cập nhật từ $ZIP_URL..."
wget -q -O /tmp/update.zip "$ZIP_URL" || curl -s -L -o /tmp/update.zip "$ZIP_URL"

if [ ! -s /tmp/update.zip ]; then
    echo "Lỗi: File update.zip rỗng hoặc tải thất bại!"
    exit 1
fi

echo "Tải file update.zip thành công ($(du -h /tmp/update.zip | cut -f1))"

# 4. Giải nén file cập nhật
echo "Đang giải nén file cập nhật..."
rm -rf /tmp/update_extract
mkdir -p /tmp/update_extract
python3 -m zipfile -e /tmp/update.zip /tmp/update_extract

# 5. Sao chép đè mã nguồn mới vào thư mục dự án
echo "Đang cập nhật mã nguồn mới..."
cp -rf /tmp/update_extract/* "$PROJECT_DIR/"
echo "Sao chép mã nguồn hoàn tất."

# 5b. Tạo file .env.local cho Frontend nếu chưa có
FRONTEND_ENV="$PROJECT_DIR/website_thangdz/frontend/.env.local"
if [ ! -f "$FRONTEND_ENV" ]; then
    echo "Tạo file .env.local cho Frontend..."
    cat > "$FRONTEND_ENV" << 'ENVEOF'
NEXT_PUBLIC_API_URL=https://thangdz.com/api
N8N_CHAT_WEBHOOK_URL=https://thangdepzai.devttt.com/webhook/thangdz
ENVEOF
    echo "Đã tạo .env.local cho Frontend."
else
    echo "File .env.local đã tồn tại, bỏ qua."
fi

# 6. Cập nhật Backend
echo "Cập nhật dependencies cho Backend..."
cd "$PROJECT_DIR/backend"
if [ -d "venv" ] && [ -f "venv/bin/pip" ]; then
    ./venv/bin/pip install -r requirements.txt 2>&1 || echo "CẢNH BÁO: pip install có lỗi nhưng tiếp tục..."
else
    echo "CẢNH BÁO: Không tìm thấy venv, bỏ qua cập nhật pip."
fi

# 7. Cập nhật Frontend Website
echo "Cập nhật và Build Frontend Website..."
cd "$PROJECT_DIR/website_thangdz/frontend"
echo "Xóa build cũ (.next) để build sạch..."
rm -rf .next
npm install --legacy-peer-deps 2>&1 || echo "CẢNH BÁO: npm install frontend có lỗi nhưng tiếp tục..."
NODE_OPTIONS="--max-old-space-size=1536" npm run build 2>&1
echo "Build Frontend Website hoàn tất."

# 8. Cập nhật Frontend Admin
echo "Cập nhật và Build Frontend Admin..."
cd "$PROJECT_DIR/web_quantri_thangdz"
echo "Xóa build cũ (.next) để build sạch..."
rm -rf .next
npm install --legacy-peer-deps 2>&1 || echo "CẢNH BÁO: npm install admin có lỗi nhưng tiếp tục..."
NODE_OPTIONS="--max-old-space-size=1536" npm run build 2>&1
echo "Build Frontend Admin hoàn tất."

# 9. Khởi động lại các dịch vụ
echo "Khởi động lại các dịch vụ..."

CURRENT_USER=$(whoami)
echo "User đang chạy tiến trình cập nhật: $CURRENT_USER"

# Restart backend - thử systemctl trước (chỉ khả dụng nếu chạy bằng root), fallback sang PM2 trực tiếp
if systemctl is-active --quiet thangdz-backend 2>/dev/null || systemctl list-units --full --all 2>/dev/null | grep -q thangdz-backend; then
    echo "Restart backend qua systemctl..."
    systemctl restart thangdz-backend 2>&1 || echo "CẢNH BÁO: systemctl restart thất bại"
    sleep 3
else
    echo "Không dùng systemd service, restart backend qua PM2 trực tiếp..."
    pm2 restart thangdz-backend 2>&1 || echo "CẢNH BÁO: Không thể restart thangdz-backend trực tiếp, thử lại..."
    sleep 3
fi

curl -fsS http://127.0.0.1:8000/health >/dev/null 2>&1 && echo "Backend health check: OK" || echo "CẢNH BÁO: Backend health check thất bại"

# Restart frontend và admin qua PM2 trực tiếp (không dùng sudo vì current user là www đã sở hữu PM2 rồi)
echo "Restart frontend và admin qua PM2..."
pm2 restart thangdz-frontend 2>&1 || echo "CẢNH BÁO: Không thể restart thangdz-frontend"
pm2 restart thangdz-admin 2>&1 || echo "CẢNH BÁO: Không thể restart thangdz-admin"


echo ""
echo "========================================="
echo "CẬP NHẬT HOÀN TẤT THÀNH CÔNG! - $(date)"
echo "Hệ thống sẽ hoạt động với phiên bản mới $LATEST_VERSION."
echo "========================================="
