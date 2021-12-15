import styles from './styles'
import useStyles from '../../../utils/hooks/useStyles'
import FeedbackForm from './FeedbackForm/FeedbackForm'
import { useSelector, useDispatch } from 'react-redux'
import { getBreedName, getPhotos, getBreedRawData, getTextBreedResults, getTextBreedResultsNotFound, getIsReady } from '../../../store/breed/selectors'
import { actions, selectors } from '../../../store/breeds'
import { actions as breedAction } from '../../../store/breed'
import { useEffect } from 'react'

function SearchResult(props) {
  const classes = useStyles(styles)

  const breedName = useSelector(getBreedName)
  const breeds = useSelector(selectors.getBreeds) ?? [];

  const dispatch = useDispatch();

  useEffect(() => dispatch(actions.getBreeds()), []);

  const photos = useSelector(getPhotos);

  useEffect(() => {
    dispatch(breedAction.setBreedName(""));
    dispatch(breedAction.resetIsReady());
  }, []);

  const breedRawData = useSelector(getBreedRawData);
  const IsReady = useSelector(getIsReady);
  const TextBreedResults = useSelector(getTextBreedResults);
  const TextBreedResultsNotFound = useSelector(getTextBreedResultsNotFound);



  const breedObj = breeds?.filter(x => x.name === breedName)[0]?.photo
  // console.log(breeds);

  
  if (props.typeSearch === "text" && TextBreedResults && TextBreedResults.length > 0) {
    return (
      <div className={classes.breedInfo} style={{ display: "flex", flexDirection: "column", }}>
        <p style={{textAlign: "center", fontSize: "30px" }}>Результати пошуку:</p>
        {TextBreedResults?.map(x => (
          <div style={{ display: "flex", marginBottom: "10px" }}>
            <img src={"http://localhost:5432/" + x.photo} style={{ width: "200px" }} />
            <p style={{marginBottom: "auto", textTransform: "capitalize", marginTop: "auto", marginLeft: "5px"}} id={x.name}>{x.name}</p>
          </div>
        ))}
      </div>
    );
  } else if (props.typeSearch === "text" && TextBreedResultsNotFound === true) {
    return (
      <div className={classes.breedInfo} style={{ display: "flex", flexDirection: "column", }}>
        <p style={{textAlign: "center", fontSize: "30px" }}>За вашим запитом нічого не знайдено</p>
      </div>
    );
  }

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
        <div style={{ marginBottom: "20px", display: breedRawData && breedRawData.length && breedRawData.length > 1 ? "block" : "none"}}>
          <p style={{textAlign: "center"}}>Ймовірності інших порід:</p>
          <table style={{ marginLeft: "auto", marginRight: "auto", minWidth: "400px", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{textAlign: "left", padding: "5px",  fontSize: "22px", borderBottom: "2px solid black"}}>Назва породи</th>
                <th style={{textAlign: "left", padding: "5px",  fontSize: "22px", borderBottom: "2px solid black"}}>Точність, %</th>
              </tr>
            </thead>
            <tbody>
              {breedRawData?.slice(1)?.map(x => (
                <tr id={x.name}>
                  <td style={{padding: "5px", borderBottom: "1px solid black", textTransform: "capitalize"}}>{x.name}</td>
                  <td style={{padding: "5px", borderBottom: "1px solid black"}}>{(x.val * 100).toFixed(3) === "0.000" ? ">0.001" : (x.val * 100).toFixed(3) }</td>
                </tr>
              ))}
            </tbody>
          </table>
          {breedObj && (
            <>
              <p style={{textAlign: "center"}}>Фотографія визначеної породи ({breedName}) з датасету:</p>
              <img style={{ display: "block", marginLeft: "auto", marginRight: "auto", maxHeight: "300px"}} src={breedObj} />   
            </>
          )}
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
