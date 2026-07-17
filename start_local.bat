@echo off
title THANGDZ.COM - Cong Cu Khoi Chay Local Nhanh
color 0b

:MENU
cls
echo ===================================================================
echo               CONG CU KHOI CHAY DU AN THANGDZ.COM LOCAL
echo ===================================================================
echo.
echo   [1] Khoi chay che do Development (Nhanh, Tu dong Hot-Reload)
echo   [2] Build va Khoi chay che do Production (Thu nghiem hieu nang)
echo   [3] Cai dat / Cap nhat thu vien cho ca 3 du an (Chay lan dau)
echo   [4] Thoat
echo.
echo ===================================================================
set /p CHOICE="Nhap lua chon cua ban (1-4) va nhan Enter: "

if "%CHOICE%"=="1" goto DEV_MODE
if "%CHOICE%"=="2" goto PROD_MODE
if "%CHOICE%"=="3" goto INSTALL_DEPS
if "%CHOICE%"=="4" goto EXIT_PROG
goto MENU

:DEV_MODE
cls
echo ===================================================================
echo               DANG KHOI CHAY CHE DO PHAT TRIEN (DEV)
echo ===================================================================
echo.
echo [*] Dang mo cua so Terminal moi cho Backend (FastAPI - Port 8000)...
start "Backend API - FastAPI" cmd /k "cd backend && venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

echo [*] Dang mo Website Frontend (Next.js - Port 3000)...
start "Website Frontend" cmd /k "cd website_thangdz\frontend && npm run dev"

echo [*] Dang mo Admin Dashboard (Next.js - Port 3001)...
start "Admin Dashboard" cmd /k "cd web_quantri_thangdz && npm run dev"

echo.
echo ===================================================================
echo  DA MO THANH CONG 3 CUA SO DICH VU DUOI LOCAL:
echo  - Backend API:       http://localhost:8000/docs
echo  - Website Frontend:  http://localhost:3000
echo  - Admin Frontend:    http://localhost:3001
echo ===================================================================
echo.
pause
goto MENU

:PROD_MODE
cls
echo ===================================================================
echo               DANG BIEN DICH VA KHOI CHAY PRODUCTION
echo ===================================================================
echo.
echo [!] Qua trinh bien dich Next.js (Build) co the mat 1-2 phut...
echo.

echo [*] Dang chay Build Website Frontend...
cd website_thangdz\frontend
call npm run build
cd ..\..

echo [*] Dang chay Build Admin Dashboard...
cd web_quantri_thangdz
call npm run build
cd ..

echo.
echo [*] Dang khoi chay cac tien trinh Production...
start "Backend API - FastAPI" cmd /k "cd backend && venv\Scripts\activate.bat && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000"
start "Website Frontend (Prod)" cmd /k "cd website_thangdz\frontend && npm run start -- -p 3000"
start "Admin Dashboard (Prod)" cmd /k "cd web_quantri_thangdz && npm run start"

echo.
echo ===================================================================
echo  DA BIEN DICH VA KHOI CHAY CHE DO PRODUCTION TREN LOCAL:
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
echo               DANG CAI DAT / CAP NHAT THU VIEN DU AN
echo ===================================================================
echo.

echo [*] 1/3. Cai dat Python package cho Backend...
cd backend
if not exist venv (
    echo [!] Chua tim thay thu muc venv, dang tao moi truong ao Python...
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -r requirements.txt
cd ..

echo.
echo [*] 2/3. Cai dat Node modules cho Website Frontend...
cd website_thangdz\frontend
call npm install --legacy-peer-deps
cd ..\..

echo.
echo [*] 3/3. Cai dat Node modules cho Admin Dashboard...
cd web_quantri_thangdz
call npm install --legacy-peer-deps
cd ..

echo.
echo ===================================================================
echo               HOAN TAT CAI DAT THU VIEN DU AN!
echo ===================================================================
echo.
pause
goto MENU

:EXIT_PROG
cls
echo Cam on ban da su dung bo cong cu! Tam biet.
timeout /t 2 > nul
exit
