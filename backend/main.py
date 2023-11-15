import json
import os
from base64 import b64decode

from bottle import request, route, run

BACKEND_ENV = os.environ["BACKEND_ENV"]


@route("/api/hello/")
def hello():
    parts = {
        header_name: request.headers.get(header_name)
        for header_name in [
            "X-MS-CLIENT-PRINCIPAL-ID",
            "X-MS-CLIENT-PRINCIPAL-NAME",
            "X-MS-CLIENT-PRINCIPAL-IDP",
            "X-MS-CLIENT-PRINCIPAL",
        ]
    }

    parts["X-MS-CLIENT-PRINCIPAL"] = json.loads(
        b64decode(parts["X-MS-CLIENT-PRINCIPAL"]).decode()
    )

    parts_str = json.dumps(parts, indent=2)  # pretty print

    return f"Greetings from {BACKEND_ENV}.\nHere's what reached BE:\n{parts_str}"


print(f"Starting [{BACKEND_ENV}] server")
run(host="0.0.0.0", port=8000, debug=True)
