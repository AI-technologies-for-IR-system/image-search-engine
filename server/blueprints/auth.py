import hashlib, uuid
import psycopg2

from datetime import date
from flask_jwt_extended import (
    jwt_required, create_access_token,
    create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)
from flask import request, Blueprint, jsonify

from models.users import UsersModel
from config import other_configs
# from connection import PostgresConnection
from flask_jwt_extended import JWTManager
jwt = JWTManager()
from blueprints.annotations.roles_required import roles_required



user_model = UsersModel()

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    firstName = request.form.get('firstName', None)
    lastName = request.form.get('lastName', None)
    email = request.form.get('email', None)
    password = request.form.get('password', None)
    isAdmin = request.form.get('isAdmin', None)
    salt = uuid.uuid4().hex

    if not firstName or not lastName or not email or not password or not isAdmin:
        return jsonify({"msg": "Missing some parameter"}), 400

    password_with_salt = password + salt
    try:
        user_model.create({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "pwHash": hashlib.sha512(password_with_salt.encode('utf-8')).hexdigest(),
            "pwdSalt": salt,
            "isAdmin": isAdmin
        })
    except Exception as e:
        return jsonify({"msg": str(e)}), 400

    return jsonify({"msg": f"Registration success"}), 201


@auth.route('/login', methods=['POST'])
def login():
    email = request.form.get('email', None)
    password = request.form.get('password', None)
    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    user = user_model.get({"email": email})

    if user is None:
        return jsonify({"msg": "No such user"}), 401

    password_with_salt = password + user["pwdSalt"]
    if user["pwHash"] == hashlib.sha512(password_with_salt.encode('utf-8')).hexdigest():

        access_token = create_access_token(identity=user)
        # refresh_token = create_refresh_token(identity=user)
        resp = jsonify({
            'token': access_token,
            'userData': user
        })
        return resp, 200
    else:
        return jsonify({"msg": "Wrong password"}), 401


@auth.route('/refresh', methods=['POST'])
# @jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)

    resp = jsonify({'refresh': True})
    set_access_cookies(resp, access_token)
    return resp, 200


@auth.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200




# @auth.route('/protected', methods=['GET'])
# @jwt_required
# # @roles_required(["admin"])
# def protected():
#     if roles_required(["admin"]) == 400:
#         return jsonify({"msg": "no access"}), 400

#     current_user = get_jwt_identity()
#     return jsonify(logged_in_as=current_user), 200


@auth.route('/me', methods=['GET'])
@jwt_required
def user_info():
    current_user = get_jwt_identity()
    return jsonify({'user': current_user}), 200
