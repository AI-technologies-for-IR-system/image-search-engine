import { createSlice } from '@reduxjs/toolkit'
import noop from '../../utils/noop'

const initialState = {
  breed: {
    breedRawData: [],
    breedName: '',
    photos: [],
    isReady: false,
  },
  requestErrors: null,
}

const { actions, reducer } = createSlice({
  name: 'breed',
  initialState,
  reducers: {
    pictureSearch: noop,
    textSearch: noop,
    resetIsReady: (state) => ({
      ...state,
      breed: { ...state.breed, isReady: false, }
    }),
    setBreedRawData: (state, { payload }) => ({
      ...state,
      breed: { ...state.breed, breedRawData: payload, isReady: true },
    }),
    setBreedName: (state, { payload }) => ({
      ...state,
      breed: { ...state.breed, breedName: payload, isReady: true },
    }),
    setPhotos: (state, { payload }) => ({
      ...state,
      breed: { ...state.breed, photos: payload },
    }),
    resetBreedInfo: () => initialState,
  },
})

export { actions, reducer }

export const {
  pictureSearch,
  textSearch,
  setBreedName,
  setBreedRawData,
  setPhotos,
  resetBreedInfo,
  resetIsReady,
} = actions
