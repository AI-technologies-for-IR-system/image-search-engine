import { createSlice } from '@reduxjs/toolkit'
import noop from '../../utils/noop'

const initialState = {
  breed: {
    breedRawData: [],
    breedName: '',
    photos: [],
  },
  requestErrors: null,
}

const { actions, reducer } = createSlice({
  name: 'breed',
  initialState,
  reducers: {
    pictureSearch: noop,
    textSearch: noop,
    setBreedRawData: (state, { payload }) => ({
      ...state,
      breed: { ...state.breed, breedRawData: payload },
    }),
    setBreedName: (state, { payload }) => ({
      ...state,
      breed: { ...state.breed, breedName: payload },
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
} = actions
