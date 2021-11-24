from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import os
import base64

ml_serving = Blueprint('ml_serving', __name__)

# @ml_serving.route('/test', methods=['GET'])
# def create():
#     try:
#         res = os.listdir("../dataset/dogs_breed")
#         return jsonify({"msg": res}), 201
#     except Exception as e:
#         return jsonify({"msg": str(e)}), 400

@ml_serving.route('/breeds/names', methods=['GET'])
def get_breeds_names():
    try:
        res = [x[4:].replace("_", " ") for x in os.listdir("../dataset/dogs_breed")]
        return jsonify({"data": res}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

# def read_file_as_b64(path):
#     with open(path, "rb") as image_file:
#         encoded_string = base64.b64encode(image_file.read())
#         return "data:image/jpeg;charset=utf-8;base64," + encoded_string.decode("utf-8")

@ml_serving.route('/breeds/preview', methods=['GET'])
def get_breeds_preview():
    try:
        r = request.args.get('count')
        if r is None:
            r = 1000
        res = [{
            "name": x[4:].replace("_", " "),
            "count": len(os.listdir("../dataset/dogs_breed/" + x)),
            "photo": "/dataset/" + x + "/" + os.listdir("../dataset/dogs_breed/" + x)[0]
            # "photo": read_file_as_b64("../dataset/dogs_breed/" + x + "/" + os.listdir("../dataset/dogs_breed/" + x)[0])
        } for x in os.listdir("../dataset/dogs_breed")[:int(r)]]

        return jsonify({"data": res}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

@ml_serving.route('/breeds/names/find', methods=['GET'])
def get_breeds_preview_():
    try:
        r = request.args.get('name')
        if r is None:
            return jsonify({"msg": "de neim?"}), 400

        all_names = [x[4:].replace("_", " ") for x in os.listdir("../dataset/dogs_breed")[:]]

        user_data = r.strip().lower().split()

        stop = False
        bread = ""
        opa = -1
        for i in range(len(all_names)):
            if stop:
                break
            for j in range(len(user_data)):
                if stop:
                    break
                spltd = all_names[i].strip().lower().split()
                for k in range(len(spltd)):
                    if user_data[j] == spltd[k]:
                        stop = True
                        bread = all_names[i]
                        opa = i
                        break

        if opa < 0:
            return jsonify({"msg": "not found"}), 404

        q = os.listdir("../dataset/dogs_breed")[opa]

        res = {
            "name": bread,
            "photo": "/dataset/" + q + os.listdir("../dataset/dogs_breed/" + q)[0]
        }

        return jsonify({"data": res}), 201
    except Exception as e:
        return jsonify({"msg": str(e)}), 400
