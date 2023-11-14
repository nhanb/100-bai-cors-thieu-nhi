# 1. Deploy backend as an Azure webapp

```sh
# This installs `az` into your $PATH:
pipx install azure-cli

# Uses az to create & deploy webapp;
# You'll get a ./backend/.azure/config file - keep it.
make init-be
```

Backend uses a `BACKEND_ENV` envar to identify itself.
Since `az webapp` doesn't allow configuring envars (or I haven't found it),
set it on azure portal:

![](01-envar.png)

Run `make deploy-be` to make sure the app restarts with the right envar I
guess.

Now go to http://your-app.azurewebsites.net/api/hello/ - you should see an
empty web page with the message `Greetings from $BACKEND_ENV.`

# 2. Authentication setup

Go to your app on azure portal, Authentication, Add Identity Provider.

![](02-add-idp.png)

# Misc

```sh
make be # http://localhost:8000/api/hello/
make fe # http://localhost:3000
```
