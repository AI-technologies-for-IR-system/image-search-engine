import api from '../../../services/api'
import urls from '../../../services/apiUrl'
import { pictureSearch, setBreedName, setBreedRawData, setPhotos, textSearch } from '../slice'
import { put, takeLatest, call } from '@redux-saga/core/effects'

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

  const dataRaw = response.rawData.map(x => ({ ...x, name: x.name.replaceAll('_', ' ') })).sort((x, y) => y.val - x.val);

  // console.log("hoba");
  // console.log(dataRaw);

  yield put(
    setBreedName(response.data.replaceAll('_', ' '))
  );
  yield put(setBreedRawData(dataRaw));

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

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  takeLatest(pictureSearch, doPictureSearch),
  takeLatest(textSearch, doTextSearch),
]
