from flask import url_for

from models import ApplicationsModel


def test_get(client, db):
    url = url_for("api.decision_engine")
    body = {
        "company": "ABC",
        "year": "2023-03",
        "loanAmount": 10000,
        "preAssessment": 60,
        "profitOrLoss": 10000,
        "provider": "Xero",
    }
    resp = client.post(url, json=body)
    existing = ApplicationsModel.query.filter_by(
        company=body["company"], applicationProvider=body["provider"]
    ).first()
    json_resp = resp.json
    assert json_resp
    assert resp.status_code == 200
    assert existing is not None
