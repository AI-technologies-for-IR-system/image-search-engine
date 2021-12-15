import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import formStyles from '../../formStyles'
import styles from './styles'
import useStyles from '../../../../utils/hooks/useStyles'
import { useFormik } from 'formik'
import validationSchema from './validationSchema'
import {submitBreed} from '../../../../store/breed/slice'
import Search from '@material-ui/icons/Search'
import {useDispatch, useSelector} from "react-redux";
import {getBreedName, getSourcePhoto} from "../../../../store/breed/selectors";

function FeedbackForm() {
  const formClasses = useStyles(formStyles)
  const classes = useStyles(styles)
  const dispatch = useDispatch()
  const breedName = useSelector(getBreedName);
  const sourcePhoto = useSelector(getSourcePhoto);

  const formik = useFormik({
    initialValues: {
      expected: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("forma subm");
      dispatch(submitBreed({ ...values, actual: breedName, photo: sourcePhoto }))
    },
  })

  return (
    <form
      className={`${classes.form} ${formClasses.form}`}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        className={formClasses.field}
        fullWidth
        id="expected"
        name="expected"
        label="Порода собаки"
        placeholder="Вкажіть породу собаки, якщо не згодні з результатами"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && !!formik.errors.email} // add custom errors from store
        helperText={formik.touched.email && formik.errors.email} // add custom errors from store
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />
      <Button
        className={formClasses.submit}
        color="primary"
        variant="outlined"
        type="submit"
      >
        Відправити
      </Button>
    </form>
  )
}

export default FeedbackForm
