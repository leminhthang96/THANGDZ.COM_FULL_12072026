@echo off
:: Định cấu hình mã hóa Tiếng Việt (UTF-8)
chcp 65001 > nul
title THANGDZ.COM - Công Cụ Khởi Chạy Local Nhanh
color 0b

:MENU
cls
echo ===================================================================
echo               CÔNG CỤ KHỞI CHẠY DỰ ÁN THANGDZ.COM LOCAL
echo ===================================================================
echo.
echo   [1] Khởi chạy chế độ Development (Nhanh, Tự động Hot-Reload)
echo   [2] Build và Khởi chạy chế độ Production (Thử nghiệm hiệu năng thực tế)
echo   [3] Cài đặt / Cập nhật thư viện cho cả 3 dự án (Chạy lần đầu)
echo   [4] Thoát
echo.
echo ===================================================================
set /p CHOICE="Nhập lựa chọn của bạn (1-4) và nhấn Enter: "

if "%CHOICE%"=="1" goto DEV_MODE
if "%CHOICE%"=="2" goto PROD_MODE
if "%CHOICE%"=="3" goto INSTALL_DEPS
if "%CHOICE%"=="4" goto EXIT_PROG
goto MENU

:DEV_MODE
cls
echo ===================================================================
echo               ĐANG KHỞI CHẠY CHẾ ĐỘ PHÁT TRIỂN (DEV)
echo ===================================================================
echo.
echo [*] Đang mở cửa sổ Terminal mới cho Backend (FastAPI - Port 8000)...
start "Backend API - FastAPI" cmd /k "cd backend && venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

echo [*] Đang mở cửa sổ Terminal mới cho Website Frontend (Next.js - Port 3000)...
start "Website Frontend" cmd /k "cd website_thangdz\frontend && npm run dev"

echo [*] Đang mở cửa sổ Terminal mới cho Admin Dashboard (Next.js - Port 3001)...
start "Admin Dashboard" cmd /k "cd web_quantri_thangdz && npm run dev"

echo.
echo ===================================================================
echo  ĐÃ MỞ THÀNH CÔNG 3 CỬA SỔ DỊCH VỤ DƯỚI LOCAL:
echo  - Backend API:       http://localhost:8000/docs (Swagger UI)
echo  - Website Frontend:  http://localhost:3000
echo  - Admin Frontend:    http://localhost:3001
echo ===================================================================
echo.
pause
goto MENU

:PROD_MODE
cls
echo ===================================================================
echo               ĐANG BIÊN DỊCH VÀ KHỞI CHẠY PRODUCTION
echo ===================================================================
echo.
echo [!] Quá trình biên dịch Next.js (Build) có thể mất 1-2 phút...
echo.

echo [*] Đang chạy Build Website Frontend...
cd website_thangdz\frontend
call npm run build
cd ..\..

echo [*] Đang chạy Build Admin Dashboard...
cd web_quantri_thangdz
call npm run build
cd ..

echo.
echo [*] Đang khởi chạy các tiến trình Production...
start "Backend API - FastAPI" cmd /k "cd backend && venv\Scripts\activate.bat && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000"
start "Website Frontend (Prod)" cmd /k "cd website_thangdz\frontend && npm run start -- -p 3000"
start "Admin Dashboard (Prod)" cmd /k "cd web_quantri_thangdz && npm run start"

echo.
echo ===================================================================
echo  ĐÃ BIÊN DỊCH VÀ KHỞI CHẠY CHẾ ĐỘ PRODUCTION TRÊN LOCAL:
echo  - Backend API:       http://localhost:8000/docs
echo  - Website Frontend:  http://localhost:3000
echo  - Admin Frontend:    http://localhost:3001
echo ===================================================================
echo.
pause
goto MENU

:INSTALL_DEPS
cls
echo ===================================================================
echo               ĐANG CÀI ĐẶT / CẬP NHẬT THƯ VIỆN DỰ ÁN
echo ===================================================================
echo.

echo [*] 1/3. Cài đặt Python package cho Backend...
cd backend
if not exist venv (
    echo [!] Chưa tìm thấy thư mục venv, đang tạo môi trường ảo Python...
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -r requirements.txt
cd ..

echo.
echo [*] 2/3. Cài đặt Node modules cho Website Frontend...
cd website_thangdz\frontend
call npm install --legacy-peer-deps
cd ..\..

echo.
echo [*] 3/3. Cài đặt Node modules cho Admin Dashboard...
cd web_quantri_thangdz
call npm install --legacy-peer-deps
cd ..

echo.
echo ===================================================================
echo               HOÀN TẤT CÀI ĐẶT THƯ VIỆN DỰ ÁN!
echo ===================================================================
echo.
pause
goto MENU

:EXIT_PROG
cls
echo Cảm ơn bạn đã sử dụng bộ công cụ! Tạm biệt.
timeout /t 2 > nul
exit
