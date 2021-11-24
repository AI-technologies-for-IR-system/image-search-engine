import sys
import os
from flask import Flask, Blueprint, send_from_directory, jsonify, request
from dotenv import load_dotenv, find_dotenv
from flask_jwt_extended import jwt_required
from waitress import serve

from blueprints.annotations.roles_required import roles_required
from blueprints.auth import auth, jwt
from blueprints.reports import reports

from models.users import UsersModel

from config import config_jwt
from controller import Controller

from config import config_db


# @app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def index(path):
#     return send_from_directory('dist', 'index.html')

# static = Blueprint('static', __name__)

app = Flask(__name__)
app.config['JWT_TOKEN_LOCATION'] = config_jwt['JWT_TOKEN_LOCATION']
app.config['JWT_REFRESH_COOKIE_PATH'] = config_jwt['JWT_REFRESH_COOKIE_PATH']
app.config['JWT_SECRET_KEY'] = config_jwt['JWT_SECRET_KEY']
jwt.init_app(app)

app.register_blueprint(auth, url_prefix='/auth')
app.register_blueprint(reports, url_prefix='/reports')

@app.route('/')
def serve_static_index():
    return send_from_directory('../client/build/', 'index.html')

# @app.route('/static/<path:path>') # serve whatever the client requested in the static folder
# def serve_static(path):
#     return jsonify({"msg": "Missing password parameter"}), 400
    # return send_from_directory('../client/build/static/', path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=config_db['port'])