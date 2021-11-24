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
    // login: noop,
    // logout: noop,
    // register: noop,
    // setLoginErrors: (state, { payload }) => ({ ...state, loginErrors: payload }),
    // setRegisterErrors: (state, { payload }) => ({ ...state, registerErrors: payload }),
    // setUserData: (state, { payload }) => ({ ...initialState, user: {...payload, loggedIn: true }, }),
    // clearUserData: () => ({
    //   user: null,
    //   loginErrors: null,
    //   registerErrors: null,
    // }),
  },
});

export { actions, reducer };

export const {
  // login,
  // logout,
  // register,
  // setLoginErrors,
  // setUserData,
  // clearUserData,
  // setRegisterErrors,
  getReports,
  setReports,
} = actions;
