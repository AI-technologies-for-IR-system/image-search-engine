import { createSelector } from '@reduxjs/toolkit';

const getRoot = state => state.reports;

export const getReports = createSelector(getRoot, root => root.reports);

// export const getUserData = createSelector(getUser, root => root.user);

// export const getIsAdmin = createSelector(getUserData, root => root?.isAdmin);

// export const getLoginErrors = createSelector(getUser, root => root.loginErrors);

// export const getRegisterErrors = createSelector(getUser, root => root.registerErrors);

// export const isLoggedIn = createSelector(getUserData, root => root?.loggedIn);
