import { createSelector } from '@reduxjs/toolkit'

const getRoot = (state) => state.results

export const getResults = createSelector(getRoot, (root) => root.results)
