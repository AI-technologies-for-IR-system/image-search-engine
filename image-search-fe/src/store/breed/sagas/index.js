import api from '../../../services/api'
import urls from '../../../services/apiUrl'
import { pictureSearch, setBreedName, setBreedRawData, setPhotos, textSearch, submitBreed, resetIsReady} from '../slice'
import { put, takeLatest, call } from '@redux-saga/core/effects'
import history from "../../../history";

import { getBreedName, } from '../../../store/breed/selectors'
import { useSelector, useDispatch } from 'react-redux'
const BreedMock = 'BreedMock'
const PhotosMock = new Array(9).fill(
  'https://buffy.mlpforums.com/blog-0480907001424893244.png',
)

function* doPictureSearch({ payload }) {
  const formData = new FormData();

  if (payload?.isPhoto === true) {
    formData.append('file_img', payload.dogpic);
  } else {
    formData.append('file_img', document.getElementById('dogpic').files[0]);
  }

  const { status: _, response } = yield call(api.postMultipart, urls.predictBreedByPhoto, formData)


  // console.log("hoba");
  // console.log(dataRaw);
  if (!response.isDog) {
    yield put(setBreedName(""));
  } else {
    yield put(setBreedName(response.data.replaceAll('_', ' ')));
    const dataRaw = response.rawData.map(x => ({ ...x, name: x.name.replaceAll('_', ' ') })).sort((x, y) => y.val - x.val);
    yield put(setBreedRawData(dataRaw));
  }

  // // TODO: request from BE with payload
  // const response = { breed: BreedMock }

  // yield put(textSearch({ dogname: response.breed }))
}

function* doTextSearch({ payload }) {
  const url = new URL(urls.searchBreedByText);
  url.searchParams.append('name', payload.dogname);

  const { status: _, response } = yield call(api.get, url.toString())

  yield put(
    setBreedName(response.data.name.replace('_', ' ')),
  );

  // if (!payload.dogname) return // TODO: error
  // TODO: request from BE with payload
  // const response = { photos: PhotosMock }

  // yield put(setBreedName(payload.dogname))
  // yield put(setPhotos(response.photos))
}

function* submitCorrectBreed({ payload }) {
  const url = new URL(urls.submitCorrectBreed)

  if (payload?.isPhoto === true) {
    payload.dogpic = toBase64(payload.dogpic)
  } else {
    payload.append('dogpic', toBase64(document.getElementById('dogpic').files[0]))
  }
  payload.append('email', localStorage.getItem('email'))

  const { status: _, response } = yield call(api.post, url, payload)
  yield put(resetIsReady())
  history.push('/search-page')
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(pictureSearch, doPictureSearch),
  takeLatest(textSearch, doTextSearch),
  takeLatest(submitBreed, submitCorrectBreed)
]

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
      setLoadedImage(reader.result)
    };
    reader.onerror = error => reject(error);
  });