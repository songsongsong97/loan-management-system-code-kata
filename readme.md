# Loan Management System 

## Setup and Run in Local Environment
Backend Flask API
```
cd backend
pip install pipenv
pipenv install
pipenv shell
python main.py
```

Frontend
```
cd frontend
npm install
npm run dev
```

## API Routes
* GET [http://localhost:5000/api/applications](http://localhost:3000/api/applications). <br>Get all applications from database.

* DELETE [http://localhost:5000/api/applications/\<applicationId>](http://localhost:3000/api/applications/<applicationId>). <br>Delete application by applicationId.

* POST [http://localhost:5000/api/decision_engine](http://localhost:3000/api/decision_engine). <br>Add new application to database.

* GET [http://localhost:5000/api/balance_sheet](http://localhost:3000/api/balance_sheet). <br>Get balance sheet from application provider, compute preAssessment value, total assets value and total profit or loss by company.

## Run Pytest
```
cd backend
pipenv shell
pytest
```

## Getting Balance Sheet for a Company

Please use the following combination to test.

```
[
    {
        "company":"ABC","accountingProvider:"Xero"
    },
    {
        "company":"XYZ","accountingProvider:"MYOB"
    }
]
```
To add more test cases, please modify `backend/SHEET.json`



## Run Docker
```
docker-compose build
docker-compose up
```