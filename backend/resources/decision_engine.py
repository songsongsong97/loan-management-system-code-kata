import random
from datetime import datetime

from flask import request
from flask_restful import Resource

from extensions import db
from models import ApplicationsModel
from schemas import ApplicationsSchema


class DecisionEngineResource(Resource):
    def post(self):
        body = request.json
        if "preAssessment" not in body:
            return {"message": "Invalid preAssessment"}, 400
        if "company" not in body:
            return {"message": "Invalid company"}, 400
        if "year" not in body:
            return {"message": "Invalid year"}, 400
        if "profitOrLoss" not in body:
            return {"message": "Invalid profitOrLoss"}, 400
        if "provider" not in body:
            return {"message": "Invalid provider"}, 400
        if "loanAmount" not in body:
            return {"message": "Invalid loanAmount"}, 400
        company, year, pre_assessment, profit_or_loss, provider, loan_amount = (
            body["company"],
            body["year"],
            body["preAssessment"],
            body["profitOrLoss"],
            body["provider"],
            body["loanAmount"],
        )
        random_num = random.random()
        is_approved = random_num <= pre_assessment / 100
        status = "Approved" if is_approved else "Rejected"

        existing = ApplicationsModel.query.filter_by(
            company=company, applicationProvider=provider
        ).first()
        if existing:
            return {"message": "Duplicate application"}, 400
        schema = ApplicationsSchema()
        new_application = ApplicationsModel(
            company=company,
            yearEstablished=datetime.strptime(year, "%Y-%m"),
            applicationProvider=provider,
            loanAmount=loan_amount,
            status=status,
            profitOrLoss=profit_or_loss,
        )
        db.session.add(new_application)
        db.session.commit()
        return {
            "message": "Your application has been submitted.",
            "application": schema.dump(new_application),
        }, 200
