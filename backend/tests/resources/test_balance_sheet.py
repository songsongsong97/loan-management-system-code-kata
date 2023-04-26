from flask import url_for


def test_get(client):
    url = url_for("api.balance_sheet")
    params = {"company": "ABC", "provider": "Xero", "amount": 10000}
    resp = client.get(url, query_string=params)
    json_resp = resp.json
    assert json_resp
    assert resp.status_code == 200


def test_get_should_return_400(client):
    url = url_for("api.balance_sheet")
    params = {"company": "ABCD", "provider": "Xero", "amount": 10000}
    resp = client.get(url, query_string=params)
    json_resp = resp.json
    assert json_resp
    assert resp.status_code == 400
    assert json_resp["message"] == "Combination of company and provider does not exist."
