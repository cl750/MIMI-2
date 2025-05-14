import sys
import os
import subprocess
import time
import webbrowser
import importlib.util

def check_flask():
    try:
        import flask
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "flask"])

def run_server():
    if getattr(sys, "frozen", False):
        base_path = os.path.join(os.path.dirname(sys.executable), "..",)
    else:
        base_path = os.path.dirname(__file__)
    
    backend_path = os.path.abspath(os.path.join(base_path, "..", "backend"))
    main_path = os.path.join(backend_path, "main.py")

    if not os.path.exists(main_path):
            raise FileNotFoundError(f"Cannot find main.py in {backend_path}")
    
    os.chdir(backend_path)
    subprocess.Popen([sys.executable, main_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, creationflags=subprocess.CREATE_NO_WINDOW)

def main():
    check_flask()
    run_server()
    webbrowser.open("http://127.0.0.1:5000")
    
if __name__ == "__main__":
    main()