import sys
import os
import subprocess
import time
import webbrowser
import importlib.util
import psutil

server_process = None

def kill_process_on_port(port):
    for proc in psutil.process_iter(['pid', 'name', 'connections']):
        try:
            for conn in proc.connections():
                if conn.laddr.port == port:
                    proc.terminate()
                    proc.wait(timeout=5)
                    return True
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass
    return False

def check_flask():
    try:
        import flask
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "flask"])

def run_server():
    global server_process

    if getattr(sys, "frozen", False):
        base_path = os.path.join(os.path.dirname(sys.executable), "..",)
    else:
        base_path = os.path.dirname(__file__)
    
    backend_path = os.path.abspath(os.path.join(base_path, "..", "backend"))
    main_path = os.path.join(backend_path, "main.py")

    if not os.path.exists(main_path):
            raise FileNotFoundError(f"Cannot find main.py in {backend_path}")
    
    kill_process_on_port(5000)
    os.chdir(backend_path)
    server_process = subprocess.Popen([sys.executable, main_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE, creationflags=subprocess.CREATE_NO_WINDOW)
    time.sleep(2)
    return server_process.poll() is None

def cleanup():
    global server_process
    if server_process:
        try:
            server_process.terminate()
            server_process.wait(timeout=5)
        except Exception as e:
            kill_process_on_port(5000)

def main():
    try:
        check_flask()
        if not run_server():
            raise RuntimeError("Failed to start the Flask server.")
        webbrowser.open("http://127.0.0.1:5000")
        while server_process and server_process.poll() is None:
            time.sleep(1)
    except Exception as e:
        print(f"Error: {e}")
        cleanup()
        sys.exit()

if __name__ == "__main__":
    main()