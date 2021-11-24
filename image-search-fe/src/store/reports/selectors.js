import { createSelector } from '@reduxjs/toolkit'

const getRoot = (state) => state.reports

export const getReports = createSelector(getRoot, (root) => root.reports)
