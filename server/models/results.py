import datetime
import time
import pickle
import os

DB_RESULTS_PATH = os.path.join(os.path.dirname(__file__), '../db/results.db')


class ResultsModel:
    def __init__(self):
        if os.path.exists(DB_RESULTS_PATH):
            self.results = pickle.load(open(DB_RESULTS_PATH, "rb"))
        else:
            self.results = []

    def create(self, data: dict) -> bool:
        data['id'] = time.time()
        data['date'] = datetime.datetime.today()
        if data['email'] and data['photo'] and data['result']:
            self.results.append(data.copy())
            pickle.dump(self.results, open(DB_RESULTS_PATH, "wb"))
            return True
        return False

    def get(self, keys: dict):
        email = keys['email']
        if email:
            user_results = list(filter(lambda d: d['email'] == email, self.results))
            return user_results
        return None