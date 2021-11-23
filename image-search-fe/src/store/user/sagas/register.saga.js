import { call, put, takeLatest } from 'redux-saga/effects';
import { register, setRegisterErrors, setUserData } from '../slice';
import api from '../../../services/api';
import urls from '../../../services/apiUrl';
import { startLoading, stopLoading } from '../../loading/slice';
import history from '../../../history';

function* registerSaga({ payload }) {
  try {
    yield put(startLoading());
    const { status, response } = yield call(api.post, urls.register, payload);

    if (status === 404) {
      return yield put(setRegisterErrors({
        email: 'Дана пошта уже використовується',
      }))
    }

    localStorage.setItem('userAuthToken', response.token);
    localStorage.setItem('userFirstName', response.userData.firstName);
    localStorage.setItem('userLastName', response.userData.lastName);

    yield put(setUserData(response.userData))
    history.push('/calculator');
  } catch(error) {
    yield put(setRegisterErrors(error))
  } finally {
    yield put(stopLoading());
  } 
}

export default takeLatest(register, registerSaga);