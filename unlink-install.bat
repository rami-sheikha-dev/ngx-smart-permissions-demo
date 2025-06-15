@echo off
echo 🔧 Uninstalling local ngx-smart-permissions...
npm uninstall ngx-smart-permissions

echo 🧹 Unlinking any local links...
npm unlink ngx-smart-permissions

echo 📦 Installing from NPM...
npm install ngx-smart-permissions

echo ✅ Done! Library installed from NPM.
pause
