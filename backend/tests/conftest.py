from datetime import datetime

import pytest

from extensions import create_app
from extensions import db as _db
from models import ApplicationsModel
from views import blueprint


@pytest.fixture(scope="session")
def app():
    app = create_app(testing=True)
    app.register_blueprint(blueprint)
    with app.app_context():
        new_application = ApplicationsModel(
            company="test",
            yearEstablished=datetime.utcnow(),
            applicationProvider="test",
            loanAmount=10000,
            status="Approved",
            profitOrLoss=10000,
        )
        _db.session.add(new_application)
        _db.session.commit()
    return app


@pytest.fixture(scope="session")
def client(app):
    return app.test_client()


@pytest.fixture(scope="session")
def db(app):
    yield _db
    with app.app_context():
        _db.drop_all()

