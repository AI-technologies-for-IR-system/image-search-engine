import styles from './styles'
import useStyles from '../../../utils/hooks/useStyles'
import { useCallback } from 'react'
import PictureForm from './PictureForm/PictureForm'
import TextForm from './TextForm/TextForm'
import PhotoForm from './PhotoForm/PhotoForm'
import { useDispatch } from 'react-redux'
import { resetBreedInfo } from '../../../store/breed/slice'

function SearchForm(props) {
  const classes = useStyles(styles)
  const dispatch = useDispatch()

  const setFormState = useCallback(
    (typeSearch) => {
      props.setTypeSearch(typeSearch)
      dispatch(resetBreedInfo())
    },
    [dispatch, props],
  )

  return (
    <div className={classes.formContainer}>
      <div className={classes.formSwitcher}>
        <div
          className={`${classes.formVariant} ${
            props.typeSearch === "image" ? classes.active : ''
          }`}
          onClick={() => setFormState("image")}
        >
          Шукати за картинкою
        </div>
        <div
          className={`${classes.formVariant} ${
            props.typeSearch === "photo" ? classes.active : ''
          }`}
          onClick={() => setFormState("photo")}
        >
          Шукати за фотографією з камери
        </div>
        <div
          className={`${classes.formVariant} ${
            props.typeSearch === "text" ? classes.active : ''
          }`}
          onClick={() => setFormState("text")}
        >
          Шукати за текстом
        </div>
      </div>

      {props.typeSearch === "text" ? <TextForm /> : props.typeSearch === "image" ? <PictureForm /> : <PhotoForm />}
    </div>
  )
}

export default SearchForm
