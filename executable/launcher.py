import sys
import os
import subprocess
import time
import webbrowser
import psutil
import logging
import socket

logging.basicConfig(filename='launcher.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

server_process = None

def kill_process_on_port(port):
    for proc in psutil.process_iter():
        try:
            net_connections = proc.net_connections()
            for net_conn in net_connections:
                if net_conn.laddr.port == port:
                    proc.terminate()
                    proc.wait(timeout=5)
                    return True
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.Error):
            continue
    return False

def check_flask():
    try:
        import flask
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "flask"])

def run_server():
    global server_process
    try:
        if getattr(sys, "frozen", False): #.exe
            base_path = os.path.join(os.path.dirname(sys.executable), "..", "..")
            logging.debug(f"Executable base path: {base_path}")
        else: #.py
            base_path = os.path.join(os.path.dirname(__file__), "..")
            logging.debug(f"Script base path: {base_path}")
        
        backend_path = os.path.abspath(os.path.join(base_path, "backend"))
        main_path = os.path.join(backend_path, "main.py")

        if not os.path.exists(main_path):
                raise FileNotFoundError(f"Cannot find main.py in {backend_path}")
        
        env = os.environ.copy()
        env['FLASK_APP'] = main_path
        env['FLASK_ENV'] = 'production'
        env['FLASK_DEBUG'] = '0'
        env['PYTHONPATH'] = backend_path
        
        kill_process_on_port(5000)
        os.chdir(backend_path)

        server_process = subprocess.Popen([sys.executable, main_path], env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, creationflags=subprocess.CREATE_NO_WINDOW, universal_newlines=True)
        time.sleep(2)

        if server_process.poll() is not None:
            logging.error("Server process terminated immediately.")
            return False
        logging.debug("Server process started successfully.")
        return True
    
    except Exception as e:
        logging.error(f"Error starting server: {e}")
        return False

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
        kill_process_on_port(5000)
        check_flask()
        if not run_server():
            logging.error("Failed to start the Flask server.")
            return
        webbrowser.open("http://127.0.0.1:5000")
        while server_process and server_process.poll() is None:
            time.sleep(1)
    except Exception as e:
        logging.error(f"Error: {e}")
        cleanup()
        sys.exit()

if __name__ == "__main__":
    main()