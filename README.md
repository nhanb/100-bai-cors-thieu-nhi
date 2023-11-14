# 1. Deploy backend as an Azure webapp

```sh
# This installs `az` into your $PATH:
pipx install azure-cli

# Uses az to create & deploy webapp;
# You'll get a ./backend/.azure/config file - keep it.
make deploy-be
```

Backend uses a `BACKEND_ENV` envar to identify itself.
Since `az webapp` doesn't allow configuring envars (or I haven't found it),
set it on azure portal:

![](01-envar.png)

Run `make deploy-be` again to make sure the app restarts with the right envar.

Dev:

```sh
make be # http://localhost:8000/api/hello/
make fe # http://localhost:3000
```
