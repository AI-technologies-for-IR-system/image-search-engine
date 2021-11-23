import useStyles from '../../utils/hooks/useStyles'
import styles from './styles'

const Guide = () => {
  const classes = useStyles(styles)

  return (
    <div className={classes.loginContent}>
      Для представлення наявно заданої функції у явному вигляді в околі точки
      потрібно:
      <ol>
        <li>
          Ввести вираз для неявної функції.
          <p>
            Для введення виразу потрібно використовувати стандартні команди
            <ul className={classes.commands}>
              <li>
                Для піднесення до степеня <code>^</code>
              </li>
              <li>
                Для квадратного кореня <code>sqrt</code>
              </li>
              <li>
                Для для числа П <code>pi</code>
              </li>
              <li>
                Для натурального логарифма <code>ln</code>
              </li>
              <li>
                Для тригонометричних функцій <code>arctan</code>
              </li>
            </ul>
          </p>
        </li>
        <li>Вказати символи для аргумента та функції.</li>
        <li>
          Задати координати з точністю до десятих точки, в околі якої потрібно
          виконати представлення.
        </li>
        <li>Задати окіл точки по осям аргумента та функції.</li>
        <li>Натиснути кнопку "Представити явно".</li>
      </ol>
      <img
        src="/start-form.png"
        alt="Math and notebook"
        className={classes.logo}
      />
      <span>
        <span className={classes.paragraph}></span>
        Якщо вираз введений неправильно, має лише одну змінну, більше двох
        змінних або ж містить не задані символи, буде відображатись відповідне
        повідомлення про помилку.
      </span>
      <img src="/var2.png" alt="Math and notebook" className={classes.logo} />
      <img
        src="/explicit.png"
        alt="Math and notebook"
        className={classes.logo}
      />
      <span>
        <span className={classes.paragraph}></span>
        Також перед початком побудови представлення відбувається валідація
        введених даних. Якщо початкова точка не належить неявній функції, то
        відповідне повідомлення про помилку відобразиться.
        <img
          src="/point.png"
          alt="Math and notebook"
          className={classes.logo}
        />
      </span>
    </div>
  )
}

export default Guide
