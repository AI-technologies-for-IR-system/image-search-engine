const base = `http://127.0.0.1:5432`

const apiUrls = {
  login: `${base}/auth/login`,
  register: `${base}/auth/register`,
  reports: `${base}/reports`,
  breeds: `${base}/ml/serving/breeds/preview`,
  breedsNew: `${base}/ml/serving/breeds/preview_new`,
  predictBreedByPhoto: `${base}/ml/serving/breeds/image/predict`,
  searchBreedByText: `${base}/ml/serving/breeds/names/find`,
  searchBreedByTextNew: `${base}/ml/serving/breeds/names/find_new`,
  submitCorrectBreed: `${base}/reports/create`
}

export default apiUrls
