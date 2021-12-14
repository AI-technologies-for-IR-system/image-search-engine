import styles from './styles'
import useStyles from '../../../utils/hooks/useStyles'
import FeedbackForm from './FeedbackForm/FeedbackForm'
import { useSelector } from 'react-redux'
import { getBreedName, getPhotos, getBreedRawData } from '../../../store/breed/selectors'

function SearchResult(props) {
  const classes = useStyles(styles)

  const breedName = useSelector(getBreedName)

  const photos = useSelector(getPhotos)

  const breedRawData = useSelector(getBreedRawData);

  return (
    breedName &&
    /* photos.length && // TODO: remove comment!!!!! */ (
      <div className={classes.container}>
        <div className={classes.breedInfo}>
          <span className={classes.breedLabel}>Порода:</span>
          <span className={classes.breedName}>{breedName}</span>
          <div>
            <ul>
              {breedRawData?.map(x => (
                <li id={x.name}>{x.name}, {(x.val * 100).toFixed(3) === "0.000" ? ">0.001" : (x.val * 100).toFixed(3) }%</li>
              ))}
            </ul>
          </div>
          {props.typeSearch !== "text" && <FeedbackForm />}
        </div>
        {/* <div className={classes.photoList}> // TODO: remove comment!!!!!
          {photos.map((photo, i) => (
            <img
              className={classes.photoItem}
              key={i}
              alt={`dog ${i + 1}`}
              src={photo}
            />
          ))}
        </div> */} 
      </div>
    )
  )
}

export default SearchResult
