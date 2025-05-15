from flask import Flask, render_template
import os
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
def home():
    return render_template("home.html")

def on_closing():
    kill(5000)

if __name__ == "__main__":
    # app.run(host="127.0.0.1", port=5000, debug=False)
    kill(5000)
    window = webview.create_window("DATEABASE", app, fullscreen=True)
    window.events.closing += on_closing
    webview.start()
    
