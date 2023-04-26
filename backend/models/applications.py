from datetime import datetime

from sqlalchemy import UniqueConstraint

from extensions import db


class ApplicationsModel(db.Model):
    __table_args__ = (
        UniqueConstraint("company", "applicationProvider", name="unique_application"),
    )

    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(80), nullable=False)
    applicationProvider = db.Column(db.String(80), nullable=False)
    yearEstablished = db.Column(db.DateTime, nullable=False)
    profitOrLoss = db.Column(db.Integer, nullable=False)
    loanAmount = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(25), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
