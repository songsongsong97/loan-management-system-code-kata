from flask_restful import Resource

from extensions import db
from models import ApplicationsModel
from schemas import ApplicationsSchema


class ApplicationsResource(Resource):
    def get(self):
        schema = ApplicationsSchema(many=True)
        applications = ApplicationsModel.query.all()
        return schema.dump(applications), 200


class ApplicationsByIdResource(Resource):
    def delete(self, id: int):
        application = ApplicationsModel.query.filter_by(id=id).first()
        db.session.delete(application)
        db.session.commit()
        return {"message": "Application deleted"}, 200
