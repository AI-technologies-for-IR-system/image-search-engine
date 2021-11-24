import { combineReducers } from '@reduxjs/toolkit'

import createStore from './createStore'
import * as loading from './loading'
import * as notifications from './notifications'
import * as user from './user'
import * as reports from './reports'
import * as breeds from './breeds'

export default createStore({
  reducer: combineReducers({
    loading: loading.reducer,
    notifications: notifications.reducer,
    user: user.reducer,
    reports: reports.reducer,
    breeds: breeds.reducer,
  }),
  sagas: [...user.sagas, ...reports.sagas, ...breeds.sagas],
  middleware: [],
})
