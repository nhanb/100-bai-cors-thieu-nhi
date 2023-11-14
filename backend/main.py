import os

from bottle import route, run

BACKEND_ENV = os.environ["BACKEND_ENV"]


@route("/api/hello/")
def hello():
    return f"Greetings from {BACKEND_ENV}."


print(f"Starting [{BACKEND_ENV}] server")
run(host="0.0.0.0", port=8000, debug=True)
