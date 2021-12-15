import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from '../slice'
import api from '../../../services/api'
import urls from '../../../services/apiUrl'
import { startLoading, stopLoading } from '../../loading/slice'

function* getResults({ payload }) {
  try {
    yield put(startLoading())

    const url = new URL(urls.results);
    url.searchParams.append('email', localStorage.getItem('email'))

    const { status: _, response } = yield call(api.get, url.toString())

    yield put(actions.setResults(response))
  } catch (error) {
    console.error(error)
  } finally {
    yield put(stopLoading())
  }
}

export default takeLatest(actions.getResults, getResults)
