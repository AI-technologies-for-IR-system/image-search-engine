from os import path

import psycopg2
from psycopg2.extras import DictCursor

from models.users import UsersModel
# from connection import PostgresConnection


class Controller(object):
    def __init__(self):
        pass
        # self._connection = PostgresConnection().get_connection()
        # self._cursor = self._connection.cursor(cursor_factory=DictCursor)
        # self._create_tables()

        # self._code_usages_blank_model = CodeUsagesBlankModel(self._connection)
        # self._notarius_model = NotariusModel(self._connection)
        # self._blank_model = BlankModel(self._connection)
        # self._usages_register_model = UsagesRegisterModel(self._connection)
        # self._users_model = UsersModel(self._connection)
        # self._journal_actions_model = JournalActionsModel(self._connection)
        # self._verifications_register_model = VerificationsRegisterModel(self._connection)

        # self._users_model.generate_data(5000)
        # self._notarius_model.generate_data(5000)
        # self._blank_model.generate_data(5000)
        # self._usages_register_model.generate_data(5000)
        # self._journal_actions_model.generate_data(5000)
        # self._verifications_register_model.generate_data(5000)
        # self._code_usages_blank_model.generate_data(5000)
        # self._users_model.generate_data(100)

    @property
    def connection(self):
        pass
        # return self._connection

    def _create_tables(self):
        pass
        # file_path = path.join(path.dirname(path.abspath(__file__)), '../create_tables.sql')
        # with open(file_path, 'r') as f:
        #     sql = f.read()
        # self._cursor.execute(sql)
        # self._connection.commit()



