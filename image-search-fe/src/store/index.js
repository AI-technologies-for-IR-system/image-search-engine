import { combineReducers } from '@reduxjs/toolkit'

import createStore from './createStore'
import * as loading from './loading'
import * as notifications from './notifications'
import * as user from './user'
import * as reports from './reports'
import * as results from './results'
import * as breed from './breed'
import * as breeds from './breeds'

export default createStore({
  reducer: combineReducers({
    loading: loading.reducer,
    notifications: notifications.reducer,
    user: user.reducer,
    reports: reports.reducer,
    results: results.reducer,
    breeds: breeds.reducer,
    breed: breed.reducer,
  }),
  sagas: [...user.sagas, ...reports.sagas, ...breeds.sagas, ...breed.sagas, ...results.sagas],
  middleware: [],
})
