import styles from './styles'
import useStyles from '../../../utils/hooks/useStyles'
import FeedbackForm from './FeedbackForm/FeedbackForm'
import { useSelector } from 'react-redux'
import { getBreedName, getPhotos, getBreedRawData, getIsReady } from '../../../store/breed/selectors'

function SearchResult(props) {
  const classes = useStyles(styles)

  const breedName = useSelector(getBreedName)

  const photos = useSelector(getPhotos)

  const breedRawData = useSelector(getBreedRawData);
  const IsReady = useSelector(getIsReady);

  if (IsReady && breedName === "") {
    return (
      <div className={classes.breedInfo} style={{ display: "flex", flexDirection: "column", }}>
        <p style={{textAlign: "center", fontSize: "30px" }}>Не виявлено жодної собаки на фото</p>
        <p style={{textAlign: "center", fontSize: "25px" }}>Будь ласка, завантажте фотографію з собакою</p>
      </div>
    );
  } else if (!IsReady) {
    return (
      <div className={classes.breedInfo} style={{ display: "flex", flexDirection: "column", }}>
      </div>
    );
  }

  return (
    breedName &&
    /* photos.length && // TODO: remove comment!!!!! */ (
      <div className={classes.breedInfo} style={{ display: "flex", flexDirection: "column", }}>
        <p style={{textAlign: "center", fontSize: "30px" }}>Порода: <span style={{ textTransform: "capitalize" }}><b>{breedName}</b></span></p>
        <p style={{textAlign: "center", fontSize: "28px", marginTop: 0 }}>Точність: <span><b>{breedRawData && (breedRawData[0]?.val * 100).toFixed(3)}%</b></span></p>
        <div style={{ marginBottom: "20px"}}>
          <p style={{textAlign: "center"}}>Ймовірності інших порід:</p>
          <table style={{ marginLeft: "auto", marginRight: "auto", minWidth: "400px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{textAlign: "left", padding: "5px",  fontSize: "22px", borderBottom: "2px solid black"}}>Назва породи</th>
                <th style={{textAlign: "left", padding: "5px",  fontSize: "22px", borderBottom: "2px solid black"}}>Точність, %</th>
              </tr>
            </thead>
            <tbody>
              {breedRawData?.map(x => (
                <tr id={x.name}>
                  <td style={{padding: "5px", borderBottom: "1px solid black", textTransform: "capitalize"}}>{x.name}</td>
                  <td style={{padding: "5px", borderBottom: "1px solid black"}}>{(x.val * 100).toFixed(3) === "0.000" ? ">0.001" : (x.val * 100).toFixed(3) }</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {props.typeSearch !== "text" && <FeedbackForm />}
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
