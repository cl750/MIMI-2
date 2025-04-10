@echo off
cd ../backend

pythonw -c "import flask" 2>NUL
if errorlevel 1 (
    echo Flask is not installed. Installing Flask...
    start /b pip install flask >NUL 2>&1
)

start /b pythonw main.py >NUL 2>&1
timeout /t 2 > NUL

start http://127.0.0.1:5000