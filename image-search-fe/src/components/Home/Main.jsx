import { useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isLoggedIn } from '../../store/user/selectors'
import Button from '@material-ui/core/Button'
import '../../App.css'
import styles from './styles'
import useStyles from '../../utils/hooks/useStyles'
import Shevron from '../Shevron/Shevron'

function Main() {
  const classes = useStyles(styles)
  const contentRef = useRef(null)
  const loggedIn = useSelector(isLoggedIn)

  return (
    <div className="App">
      <div className="App-main">
        <img
          src="/notebook.jpeg"
          alt="Math and notebook"
          className={classes.logo}
        />
        <div
          className="App-shevron"
          onClick={() =>
            contentRef.current.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <Shevron />
          <div>Дізнатись більше</div>
        </div>
      </div>
      <p className="App-title">
        Представлення неявно заданих функцій <br /> у явній формі
      </p>
      <div className="App-content" ref={contentRef}>
        <div className="App-content-article">
          <img
            src="/pen.jpeg"
            alt="Math and pen"
            width="500px"
            height="280px"
          />
          <span className="App-article">
            <b className="App-article-letter">Д</b>аний вебсервіс призначений
            для представлення неявно заданих функцій у явній формі. Отриманий
            результат дозволяє з певною високою точністю апроксимувати неявні
            функції, що робить їх зручними для досліджень.
          </span>
        </div>
        <div className="App-content-article">
          <div className="App-article-container">
            <span className="App-article">
              <b className="App-article-letter">T</b>акож, користуючись даним
              сервісом, ви можете зообразити функції, зберігати попередні
              представлення та відновлювати їх.
            </span>
            <span className="App-start">Почніть прямо зараз!</span>
            <div className="App-actions">
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to="/calculator"
                className={classes.calc}
              >
                Перейти до калькулятора
              </Button>
              {loggedIn ? null : (
                <>
                  <Button variant="outlined" component={RouterLink} to="/login">
                    Увійти
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.register}
                    component={RouterLink}
                    to="/register"
                  >
                    Зареєструватися
                  </Button>
                </>
              )}
            </div>
          </div>
          <img src="/Sextic_Graph.340.png" alt="Math and pen" />
        </div>
      </div>
    </div>
  )
}

export default Main
