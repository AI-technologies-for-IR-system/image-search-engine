import { createSelector } from '@reduxjs/toolkit'

const getRoot = (state) => state.reports

export const getResults = createSelector(getRoot, (root) => root.results)
