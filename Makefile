be:
	cd backend; python main.py

fe:
	cd frontend; npm start

init-be:
	cd backend; az webapp up --location southeastasia --runtime PYTHON:3.10 --sku F1
	cd backend; az webapp config set --startup-file startup.sh

deploy-be:
	cd backend; az webapp up
