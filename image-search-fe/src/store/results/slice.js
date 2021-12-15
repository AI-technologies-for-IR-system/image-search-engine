import { createSlice } from '@reduxjs/toolkit'
import noop from '../../utils/noop'

const initialState = {
  reports: null,
}

const { actions, reducer } = createSlice({
  name: 'results',
  initialState,
  reducers: {
    getResults: noop,
    setResults: (state, { payload }) => ({ ...initialState, results: payload })
  },
})

export { actions, reducer }

export const { getReports } = actions
