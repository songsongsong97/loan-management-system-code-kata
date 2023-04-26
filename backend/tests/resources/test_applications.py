from flask import url_for


def test_get(client):
    url = url_for("api.applications")
    resp = client.get(url)
    assert resp.status_code == 200


def test_delete_by_id(client):
    url = url_for("api.application_by_id", id=1)
    resp = client.delete(url)
    assert resp.status_code == 200
