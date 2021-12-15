import time
import pickle
import os

DB_REQUESTS_PATH = os.path.join(os.path.dirname(__file__), '../db/requests.db')


class RequestsModel:
    def __init__(self):
        if os.path.exists(DB_REQUESTS_PATH):
            self.requests = pickle.load(open(DB_REQUESTS_PATH, "rb"))
        else:
            self.requests = []

    def create(self, data: dict) -> bool:
        data['id'] = str(time.time())
        data['accepted'] = False
        if data['email'] and data['photo'] and data['actual'] and data['expected']:
            self.requests.append(data.copy())
            pickle.dump(self.requests, open(DB_REQUESTS_PATH, "wb"))
            return True
        return False

    def get(self, keys: dict):
        email = keys.get('email')
        request_id = keys.get('id')
        if email is not None:
            user_requests = list(filter(lambda d: d['email'] == email, self.requests))
            return user_requests
        elif request_id:
            user_request = next((item for item in self.requests if str(item["id"]) == request_id), None)
            return user_request
        return None

    def update(self, keys:dict):
        request_id = keys['id']
        status = keys['accepted']
        if request_id and status:
            user_request = self.get({'id': request_id})
            if user_request is not None:
                try:
                    self.requests.remove(user_request)
                    user_request['accepted'] = status
                    self.requests.append(user_request.copy())
                    pickle.dump(self.requests, open(DB_REQUESTS_PATH, "wb"))
                except ValueError:
                    return False
            return True
        return False

    def getAll(self, keys: dict) -> list:
        status = keys['accepted']
        user_requests = list(filter(lambda d: d['accepted'] == status, self.requests))
        return user_requests

    def getAll(self) -> list:
        return self.requests

    def delete(self, keys: dict) -> bool:
        request_id = keys['id']
        if request_id:

            user_request = self.get({'id': request_id})
            if user_request is not None:
                try:
                    self.requests.remove(user_request)
                    pickle.dump(self.requests, open(DB_REQUESTS_PATH, "wb"))
                except ValueError:
                    return False
            return True
        return False
