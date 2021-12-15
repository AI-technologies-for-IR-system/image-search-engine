import { createSelector } from '@reduxjs/toolkit'

export const getRoot = (state) => state.breed

export const getBreedName = createSelector(
  getRoot,
  (root) => root.breed.breedName,
)

export const getBreedRawData = createSelector(
  getRoot,
  (root) => root.breed.breedRawData,
)

export const getPhotos = createSelector(getRoot, (root) => root.breed.photos)

export const getRequestErrors = createSelector(
  getRoot,
  (root) => root.registerErrors,
)

export const getIsReady = createSelector(
  getRoot,
  (root) => root.breed.isReady,
)

export const getSourcePhoto = createSelector(
  getRoot,
  (root) => root.breed.sourcePhoto,
)

export const getTextBreedResults = createSelector(
  getRoot,
  (root) => root.breed.textBreedResults,
)

export const getTextBreedResultsNotFound = createSelector(
  getRoot,
  (root) => root.breed.textBreedResultsNotFound,
)
