const styles = {
  form: {
    display: 'flex',
  },
  submit: {
    marginLeft: '10px',
    flex: '200px 1 0',
    height: '56px',
  },
  camera: {
    '& video': {
      width: '700px',
      height: '500px'
    },
    '& img': {
      width: '668px',
      height: '500px'
    },
    '& div#container-circles': {
      cursor: 'pointer'
    }
  },
}

export default styles
