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

def wait_for_server(port, timeout=10):
    start_time = time.time()
    logging.debug("Waiting for Flask server to start")
    time.sleep(0.5)

    while time.time() - start_time < timeout:
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.settimeout(0.5)
                s.connect(('localhost', port))
                logging.debug("Server is ready")
                return True
        except socket.error:
            time.sleep(0.1)
            continue
    logging.error("Server failed to start within timeout")
    return False

def run_server():
    global server_process
    try:
        if getattr(sys, "frozen", False):
            base_path = os.path.join(os.path.dirname(sys.executable), "..")
        else:
            base_path = os.path.dirname(__file__)
        
        backend_path = os.path.abspath(os.path.join(base_path, "..", "backend"))
        main_path = os.path.join(backend_path, "main.py")

        if not os.path.exists(main_path):
                raise FileNotFoundError(f"Cannot find main.py in {backend_path}")
        
        kill_process_on_port(5000)
        os.chdir(backend_path)
        server_process = subprocess.Popen([sys.executable, main_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, creationflags=subprocess.CREATE_NO_WINDOW)
        time.sleep(0.5)

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
        check_flask()
        if not run_server():
            logging.error("Failed to start the Flask server.")
        if wait_for_server(5000):
            logging.debug("Opening web browser")
            webbrowser.open("http://127.0.0.1:5000")
        else:
            logging.error("Server did not start in time")
        while server_process and server_process.poll() is None:
            time.sleep(1)
    except Exception as e:
        logging.error(f"Error: {e}")
        cleanup()
        sys.exit()

if __name__ == "__main__":
    main()