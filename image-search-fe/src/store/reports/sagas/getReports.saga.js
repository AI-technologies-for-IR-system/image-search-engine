import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from '../slice'
import api from '../../../services/api'
import urls from '../../../services/apiUrl'
import { startLoading, stopLoading } from '../../loading/slice'

function* getReports({ payload }) {
  try {
    yield put(startLoading())

    const { status: _, response } = yield call(api.get, urls.reports)

    yield put(actions.setReports(response))
  } catch (error) {
    console.error(error)
  } finally {
    yield put(stopLoading())
  }
}

export default takeLatest(actions.getReports, getReports)
