from flask import Blueprint, jsonify

ml_serving = Blueprint('ml_serving', __name__)

@ml_serving.route('/test', methods=['GET'])
def create():
    try:
        return jsonify({"msg": "user was added"}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400
