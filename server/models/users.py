import uuid
from datetime import date

import hashlib
# from random_data_generators import *

class UsersModel:
    def __init__(self):
        self.users = []

    def create(self, data: dict) -> int:
        email = data['email']
        if email:
            user = [x for x in self.users if x['email'] == email]
            if user:
                raise Exception('User with such email is already exist')
        self.users.append(data.copy())

    def get(self, keys: dict) -> dict:
        email = keys['email']
        if email:
            user = next((x for x in self.users if x['email'] == email), None)
            return user
        return None

