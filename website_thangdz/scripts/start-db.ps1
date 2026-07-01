# scripts/start-db.ps1
# Script khởi động PostgreSQL cục bộ trên cổng 5433 và tạo database personal_web

$PgBinDir = "C:\Program Files\PostgreSQL\18\bin"
$DbDir = "d:\vibecoding_canhan\thangdz\website_thangdz\pg_data"
$Port = 5433
$DbName = "personal_web"
$LogFile = "$DbDir\server_run.log"

Write-Host "Dang kiem tra trang thai PostgreSQL tren cong $Port..." -ForegroundColor Cyan

# Kiem tra xem cong 5433 co dang lang nghe khong
$connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
if ($connection) {
    Write-Host "Cong $Port da duoc su dung. Co the PostgreSQL dang chay." -ForegroundColor Yellow
} else {
    Write-Host "Khoi dong PostgreSQL tu thu muc data..." -ForegroundColor Cyan
    & "$PgBinDir\pg_ctl.exe" -D "$DbDir" -o "-p $Port" start
    
    # Cho database ready
    Start-Sleep -Seconds 3
}

# Kiem tra xem DB co ket noi duoc khong
Write-Host "Dang kiem tra ket noi..." -ForegroundColor Cyan
$ready = & "$PgBinDir\pg_isready.exe" -p $Port -U postgres
Write-Host $ready -ForegroundColor Green

# Kiem tra xem database 'personal_web' da ton tai chua, neu chua thi tao
Write-Host "Dang kiem tra database '$DbName'..." -ForegroundColor Cyan
$dbList = & "$PgBinDir\psql.exe" -p $Port -U postgres -d postgres -t -c "SELECT 1 FROM pg_database WHERE datname='$DbName';"
if ($dbList -eq 1) {
    Write-Host "Database '$DbName' da ton tai." -ForegroundColor Green
} else {
    Write-Host "Dang tao database '$DbName'..." -ForegroundColor Yellow
    & "$PgBinDir\createdb.exe" -p $Port -U postgres $DbName
    Write-Host "Da tao database '$DbName' thanh cong!" -ForegroundColor Green
}

# Keep the script running to prevent the Job Object from terminating and killing postgres
Write-Host "PostgreSQL dang chay tren cong $Port. Dang giu tien trinh hoat dong..." -ForegroundColor Green
while ($true) {
    Start-Sleep -Seconds 5
}
