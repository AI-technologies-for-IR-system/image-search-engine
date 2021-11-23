import { combineReducers } from '@reduxjs/toolkit';

import createStore from './createStore';
import * as loading from './loading';
import * as notifications from './notifications';
import * as user from './user';

export default createStore({
  reducer: combineReducers({
    loading: loading.reducer,
    notifications: notifications.reducer,
    user: user.reducer,
  }),
  sagas: [
    ...user.sagas,
  ],
  middleware: [],
});
