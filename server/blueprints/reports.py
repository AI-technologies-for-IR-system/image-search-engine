
from flask import request, Blueprint, jsonify
from flask_cors import cross_origin
from models.requests import RequestsModel
# from connection import PostgresConnection

requests_model = RequestsModel()

reports = Blueprint('reports', __name__)


@reports.route('/create', methods=['POST'])
def create():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 500
    request_json = request.json
    try:
        isCreated = requests_model.create({
            "email": request_json["email"],
            "photo": request_json["photo"],
            "expected": request_json["expected"],
            "actual": request_json["actual"],
        })
        if not isCreated:
            return jsonify({"msg": "request wasn't added"}), 500
    except Exception as e:
        return jsonify({"msg": str(e)}), 500

    return jsonify({"msg": "request was added"}), 201


@reports.route('/', methods=['GET'])
@cross_origin()
def show_reports():
    try:
        returned_data = requests_model.get_all()
    except Exception as e:
        return jsonify({"msg": str(e)}), 500
    return jsonify(returned_data), 200


@reports.route('/<id>', methods=['POST'])
def report_handler(id):
    conclusion = request.json.get('conclusion', None)
    if conclusion == 'accept':
        result = requests_model.update({'id': id, 'accepted': True})
        if result:
            return jsonify({'msg    ''': "Status of the request was updated"}), 201
        else:
            return jsonify({'msg    ''': "Status of the request wasn't updated"}), 500
    elif conclusion == 'reject':
        result = requests_model.delete({'id': id})
        if result:
            return jsonify({'msg    ''': "Request was deleted"}), 201
        else:
            return jsonify({'msg    ''': "Request wasn't deleted"}), 500
    return jsonify({'msg    ''': "Conclusion is missed"}), 400