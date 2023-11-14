be:
	cd backend; find . -name '*.py' | entr -rc python main.py

fe:
	cd frontend; npm start
