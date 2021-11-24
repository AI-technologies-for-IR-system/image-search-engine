import { createSlice } from '@reduxjs/toolkit';
import noop from '../../utils/noop';

const initialState = {
  reports: null,
};

const { actions, reducer } = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    getReports: noop,
    setReports: (state, { payload }) => ({ ...initialState, reports: payload }),
    replyReport: noop,
  },
});

export { actions, reducer };

export const {
  getReports,
  setReports,
} = actions;
