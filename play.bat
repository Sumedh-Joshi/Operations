@echo off
REM Start SRWC Ops: Shadow Shift
cd /d "%~dp0"
if not exist "OPS_2\Scripts\python.exe" (
  echo Virtual environment OPS_2 not found. Run: py -m venv OPS_2
  pause
  exit /b 1
)
echo Starting the game...
start "" http://127.0.0.1:5000
"OPS_2\Scripts\python.exe" app.py
pause
