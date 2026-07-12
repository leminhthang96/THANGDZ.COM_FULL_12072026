#!/bin/bash

# Exit on error
set -e

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

# Setup trap to delete lock file on exit (if update fails or finishes)
trap 'rm -f "$LOCK_FILE"' EXIT

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

# 4. Giải nén file cập nhật
echo "Đang giải nén file cập nhật..."
rm -rf /tmp/update_extract
mkdir -p /tmp/update_extract
python3 -m zipfile -e /tmp/update.zip /tmp/update_extract

# 5. Sao chép đè mã nguồn mới vào thư mục dự án
echo "Đang cập nhật mã nguồn mới..."
cp -rf /tmp/update_extract/* "$PROJECT_DIR/"

# 6. Cập nhật Backend
echo "Cập nhật dependencies cho Backend..."
cd "$PROJECT_DIR/backend"
# Activate venv and update requirements
./venv/bin/pip install -r requirements.txt

# 7. Cập nhật Frontend Website
echo "Cập nhật và Build Frontend Website..."
cd "$PROJECT_DIR/website_thangdz/frontend"
npm install
npm run build

# 8. Cập nhật Frontend Admin
echo "Cập nhật và Build Frontend Admin..."
cd "$PROJECT_DIR/web_quantri_thangdz"
npm install
npm run build

# 9. Khởi động lại các dịch vụ qua PM2
echo "Khởi động lại các dịch vụ PM2..."
# Xác định user chạy PM2 (tương tự deploy.sh)
REAL_USER=$SUDO_USER
if [ -z "$REAL_USER" ] || [ "$REAL_USER" = "root" ]; then
  REAL_USER=$(awk -F: '$3>=1000 && $3<60000 {print $1}' /etc/passwd | head -n 1)
  if [ -z "$REAL_USER" ]; then
    REAL_USER="root"
  fi
fi

echo "Khởi động lại PM2 dưới user: $REAL_USER"
if [ "$REAL_USER" = "root" ]; then
  pm2 restart thangdz-backend || true
  pm2 restart thangdz-frontend || true
  pm2 restart thangdz-admin || true
else
  sudo -u $REAL_USER pm2 restart thangdz-backend || true
  sudo -u $REAL_USER pm2 restart thangdz-frontend || true
  sudo -u $REAL_USER pm2 restart thangdz-admin || true
fi

echo "========================================="
echo "CẬP NHẬT HOÀN TẤT THÀNH CÔNG! - $(date)"
echo "Hệ thống sẽ hoạt động với phiên bản mới $LATEST_VERSION."
echo "========================================="
