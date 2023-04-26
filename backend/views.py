from flask import Blueprint
from flask_restful import Api

from resources import (ApplicationsByIdResource, ApplicationsResource,
                       BalanceSheetResource, DecisionEngineResource)

blueprint = Blueprint("api", __name__)
api = Api(blueprint)

api.add_resource(BalanceSheetResource, "/balance_sheet", endpoint="balance_sheet")
api.add_resource(DecisionEngineResource, "/decision_engine", endpoint="decision_engine")
api.add_resource(ApplicationsResource, "/applications", endpoint="applications")
api.add_resource(
    ApplicationsByIdResource, "/applications/<int:id>", endpoint="application_by_id"
)


@blueprint.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS")
    return response
