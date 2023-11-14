be:
	cd backend; find . -name '*.py' | entr -rc python main.py

fe:
	cd frontend; npm start

deploy-be:
	cd backend; az webapp up --location southeastasia --runtime PYTHON:3.9 --sku F1
