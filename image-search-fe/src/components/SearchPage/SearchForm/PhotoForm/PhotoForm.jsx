import Button from '@material-ui/core/Button'
import formStyles from '../../formStyles'
import useStyles from '../../../../utils/hooks/useStyles'
import { useFormik } from 'formik'
import validationSchema from './validationSchema'
import FileInput from '../../../FileInput/FileInput'
import { useDispatch } from 'react-redux'
import { pictureSearch, resetBreedInfo, setSourcePhoto } from '../../../../store/breed/slice'
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function PhotoForm() {
  const classes = useStyles(formStyles)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      dogpic: null,
      isPhoto: true
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values.dogpic);
      // document.getElementById('dogpic').files[0] = new Blob();
      dispatch(pictureSearch(values))
    },
  })

  const urltoFile = (url, filename, mimeType) => {
    return (fetch(url)
      .then(function(res){
        return res.arrayBuffer();
      })
      .then(function(buf){
        return new File([buf], filename, { type: mimeType });
      })
    );
  }

  const handleTakePhoto = async (dataUri) => {
    // Do stuff with the photo...
   const img = await urltoFile(dataUri, 'camera.png', 'image/png');
   formik.setFieldValue('dogpic', img);
   document.getElementById('preview-cam').setAttribute('src', dataUri);
    dispatch(resetBreedInfo());
    dispatch(setSourcePhoto(dataUri));
  }

  return (
    <>
      <div className={classes.camera}>
        <Camera
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
        />
      </div>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        {formik.values.dogpic && <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <p style={{ textAlign: "center" }}>Зроблена фотографія:</p>
          <img style={{ marginLeft: "auto", marginRight: "auto" }} id="preview-cam"/>
          <div style={{width: "100%"}}>
            <Button
              className={classes.submit}
              color="primary"
              variant="outlined"
              type="submit"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "15px"
              }}
            >
              Пошук
            </Button>
          </div>
        </div>}
        {/* <FileInput
          className={classes.field}
          id="dogpic"
          name="dogpic"
          label="Картинка собаки"
          placeholder="Вставте картинку собаки"
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e)
          }}
          error={formik.touched.dogpic && !!formik.errors.dogpic} // add custom errors from store
          helperText={formik.touched.dogpic && formik.errors.dogpic} // add custom errors from store
        /> */}
      </form>
    </>
  )
}

export default PhotoForm
