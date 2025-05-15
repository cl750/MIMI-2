from flask import Flask, render_template
import webview

app = Flask(__name__, template_folder="../templates", static_folder="../static", static_url_path="/static")

@app.route("/")
def home():
    return render_template("home.html")

webview.create_window("DATEABASE", app)

if __name__ == "__main__":
    # app.run(host="127.0.0.1", port=5000, debug=False)
    webview.start()