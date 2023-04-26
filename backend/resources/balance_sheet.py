import json
from datetime import datetime, timedelta

from flask import request
from flask_restful import Resource


class BalanceSheetResource(Resource):
    def get(self):
        params = request.args
        if "provider" not in params:
            return {"message": "Invalid application provider"}, 400
        if "company" not in params:
            return {"message": "Invalid company"}, 400
        if "amount" not in params or int(params["amount"]) <= 0:
            return {"message": "Invalid amount"}, 400
        company, provider, amount = (
            params["company"],
            params["provider"],
            params["amount"],
        )
        total_profit_or_loss = 0
        total_assets_value = 0
        pre_assessment = 20
        now = datetime.now()
        last_12_months = now - timedelta(days=365)
        with open("SHEET.json") as f:
            data = json.load(f)
            for d in data:
                if d["company"] == company and d["provider"] == provider:
                    details = d["data"]
                    for dt in details:
                        if (
                            datetime(dt["year"], dt["month"], now.day + 1)
                            >= last_12_months
                        ):
                            total_assets_value += dt["assetsValue"]
                            total_profit_or_loss += dt["profitOrLoss"]
                    if total_profit_or_loss > 0:
                        pre_assessment = 60
                    if total_profit_or_loss > 0 and total_assets_value / 12 > int(
                        amount
                    ):
                        pre_assessment = 100
                    return {
                        "totalAssetsValue": total_assets_value,
                        "totalProfitOrLoss": total_profit_or_loss,
                        "preAssessment": pre_assessment,
                        "data": d,
                    }, 200
        return {"message": "Combination of company and provider does not exist."}, 400
