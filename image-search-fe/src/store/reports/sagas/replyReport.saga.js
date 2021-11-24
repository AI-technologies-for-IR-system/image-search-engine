import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from '../slice';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';

function* replyReport({ payload }) {
  try {
    yield put(startLoading());

    const request = {
      conclusion: payload.conclusion,
    };

    const url = `${urls.reports}/${payload.id}`;

    const { status, response } = yield call(api.post, url, request);

    if (status === 404) {
      alert(`Report ${payload.id} was not found: ${response}`)
      return;
    }

    yield put(actions.getReports());
  } catch (error) {
    console.error(error);
  } finally {
    yield put(stopLoading());
  }
}

export default takeLatest(actions.replyReport, replyReport);
