import styles from './styles'
import useStyles from '../../utils/hooks/useStyles'
import SearchForm from './SearchForm/SearchForm'
import SearchResult from './SearchResult/SearchResult'
import { useState } from 'react'

function SearchPage() {
  const classes = useStyles(styles)
  const [typeSearch, setTypeSearch] = useState('image')

  return (
    <>
      <h1 style={{ fontSize: 40, textAlign: "center" }} >Пошук породи собаки</h1>
      <div className={classes.page}>
        <SearchForm
          setTypeSearch={setTypeSearch}
          typeSearch={typeSearch}
        />
        <SearchResult typeSearch={typeSearch} />
      </div>
    </>
  )
}

export default SearchPage
