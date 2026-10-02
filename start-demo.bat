@echo off
echo ===================================================
echo   Starting RS Wellness Integrated Demo Services
echo ===================================================

echo [1/3] Starting Backend API on http://localhost:5000...
start "RS Wellness API Server" cmd /k "cd /d c:\Our-project\New folder\backend && node server.js"

echo [2/3] Starting Customer Storefront on http://localhost:3000...
start "RS Wellness Storefront" cmd /k "cd /d c:\Our-project\New folder\storefront && python -m http.server 3000"

echo [3/3] Starting Admin Backoffice on http://localhost:5173...
start "RS Wellness Admin Panel" cmd /k "cd /d c:\Our-project\New folder\admin-panel && npm run dev"

echo.
echo All 3 demo services launched!
echo - Storefront:   http://localhost:3000
echo - Admin Panel:  http://localhost:5173
echo - API Server:   http://localhost:5000
echo ===================================================
pause
