import os
import sys
import subprocess
        
def setup():
    try:
        from flask import Flask, render_template
        import psutil
        import webview
    except ImportError:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "flask", "psutil", "webview"])

setup()

from flask import Flask, render_template
import psutil
import webview

app = Flask(__name__, template_folder=os.path.join(".", "templates"), static_folder=os.path.join(".", "static"))

def kill(port):
    for proc in psutil.process_iter():
        try:
            for conn in proc.net_connections('tcp'):
                if conn.laddr.port == port:
                    proc.terminate()
                    proc.wait(timeout=5)
                    return True
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    return False

@app.route("/")
def title():
    return render_template("title.html")

@app.route("/home")
def home():
    return render_template("home.html")

def on_close():
    kill(5000)

if __name__ == "__main__":
    # app.run(host="127.0.0.1", port=5000, debug=False)
    kill(5000)
    window = webview.create_window("DATEABASE", app, fullscreen=True, background_color="#000000")
    window.events.closing += on_close
    webview.start(debug=False)
