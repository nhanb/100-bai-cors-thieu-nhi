from bottle import route, run


@route("/api/hello/")
def hello():
    return "Hello friend."


run(host="localhost", port=8000, debug=True)
