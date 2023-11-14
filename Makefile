be:
	cd backend; find . -name '*.py' | BACKEND_ENV=local entr -rc python main.py

fe:
	cd frontend; npm start

init-be:
	cd backend; az webapp up --location southeastasia --runtime PYTHON:3.9 --sku F1
	cd backend; az webapp config set --startup-file startup.sh

deploy-be:
	cd backend; az webapp up
