
from flask import request, Blueprint, jsonify

reports = Blueprint('reports', __name__)

@reports.route('/')
def show_reports():
    rarray = [] # get reports array
    return jsonify(rarray), 400

@reports.route('/<id>', methods=['POST'])
def report_handler(id):
    conclusion = request.form.get('conclusion', None)
    if not conclusion:
        return jsonify({'msg': "Conclusion is missed"}), 400
    return jsonify({})
    