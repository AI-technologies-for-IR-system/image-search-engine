
from flask import request, Blueprint, jsonify
from flask_cors import cross_origin
from models.results import ResultsModel
# from connection import PostgresConnection

results_model = ResultsModel()

results = Blueprint('results', __name__)


@results.route('/create', methods=['POST'])
def create():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 500
    request_json = request.json
    try:
        isCreated = results_model.create({
            "email": request_json["email"],
            "photo": request_json["photo"],
            "result": request_json["result"],
        })
        if not isCreated:
            return jsonify({"msg": "result wasn't added"}), 500
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    return jsonify({"msg": "result was added"}), 201


@results.route('/', methods=['GET'])
@cross_origin()
def show_results():
    email = request.args.get('name')
    if email is None:
        return jsonify({"msg": "de neim?"}), 400

    try:
        returned_data = results_model.get({'email': email})
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    return jsonify(returned_data), 200
