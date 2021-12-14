import Button from '@material-ui/core/Button'
import formStyles from '../../formStyles'
import useStyles from '../../../../utils/hooks/useStyles'
import { useFormik } from 'formik'
import validationSchema from './validationSchema'
import FileInput from '../../../FileInput/FileInput'
import { useDispatch } from 'react-redux'
import { pictureSearch, resetIsReady } from '../../../../store/breed/slice'

import { useState } from 'react'

function PictureForm() {
  const classes = useStyles(formStyles)
  const dispatch = useDispatch()
  const [loadedImage, setLoadedImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      dogpic: null,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(pictureSearch(values));
    },
  })

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
      setLoadedImage(reader.result)
    };
    reader.onerror = error => reject(error);
  });

  return (
    <>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <FileInput
          className={classes.field}
          id="dogpic"
          name="dogpic"
          label="Картинка собаки"
          placeholder="Вставте картинку собаки"
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e);
            toBase64(e.currentTarget.files[0]);
            dispatch(resetIsReady());
          }}
          error={formik.touched.dogpic && !!formik.errors.dogpic} // add custom errors from store
          helperText={formik.touched.dogpic && formik.errors.dogpic} // add custom errors from store
        />
        <Button
          className={classes.submit}
          color="primary"
          variant="outlined"
          type="submit"
        >
          Пошук
        </Button>
      </form>
      {loadedImage && (
        <div>
          <p style={{textAlign: "center", fontSize: "20px"}}>Завантажене зображення:</p>
          <img style={{ display: "block", marginLeft: "auto", marginRight: "auto", maxHeight: "400px" }} src={loadedImage} />
        </div>
      )}
    </>
  )
}

export default PictureForm
