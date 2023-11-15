import json
import os
from base64 import b64decode

from bottle import request, route, run

BACKEND_ENV = os.environ["BACKEND_ENV"]


@route("/api/hello/")
def hello():
    headers = {
        header_name: request.headers.get(header_name)
        for header_name in [
            "X-MS-CLIENT-PRINCIPAL-ID",
            "X-MS-CLIENT-PRINCIPAL-NAME",
            "X-MS-CLIENT-PRINCIPAL-IDP",
            "X-MS-TOKEN-AAD-ACCESS-TOKEN",
            "X-MS-TOKEN-AAD-ID-TOKEN",
            "X-MS-CLIENT-PRINCIPAL",
        ]
    }

    headers["X-MS-CLIENT-PRINCIPAL"] = json.loads(
        b64decode(headers["X-MS-CLIENT-PRINCIPAL"]).decode()
    )

    return {
        "BACKEND_ENV": BACKEND_ENV,
        "headersReceivedByBackend": headers,
    }


print(f"Starting [{BACKEND_ENV}] server")
run(host="0.0.0.0", port=8000, debug=True)
