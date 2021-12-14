import uuid
from datetime import date
import pickle
import os
import hashlib
# from random_data_generators import *

DB_USER_PATH = os.path.join(os.path.dirname(__file__), '../db/user.db')


class UsersModel:
    def __init__(self):
        if os.path.exists(DB_USER_PATH):
            self.users = pickle.load(open(DB_USER_PATH, "rb"))
        else:
            self.users = []

    def create(self, data: dict) -> int:
        email = data['email']
        if email:
            user = [x for x in self.users if x['email'] == email]
            if user:
                raise Exception('User with such email is already exist')
        self.users.append(data.copy())
        pickle.dump(self.users, open(DB_USER_PATH, "wb"))

    def get(self, keys: dict) -> dict:
        email = keys['email']
        if email:
            user = next((x for x in self.users if x['email'] == email), None)
            return user
        return None

