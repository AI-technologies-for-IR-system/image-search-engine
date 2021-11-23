import { createSelector } from '@reduxjs/toolkit';

export const getUser = state => state.user;

export const getUserData = createSelector(getUser, root => root.user);

export const getLoginErrors = createSelector(getUser, root => root.loginErrors);

export const getRegisterErrors = createSelector(getUser, root => root.registerErrors);

export const isLoggedIn = createSelector(getUserData, root => root?.loggedIn);