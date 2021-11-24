const base = `http://127.0.0.1:5432`

const apiUrls = {
  login: `${base}/auth/login`,
  register: `${base}/auth/register`,
  reports: `${base}/reports`,
  breeds: `${base}/ml/serving/breeds/preview`,
  predictBreedByPhoto: `${base}/ml/serving/breeds/image/predict'`
}

export default apiUrls
