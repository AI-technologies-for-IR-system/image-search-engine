import * as yup from 'yup'

const validationSchema = yup.object({
  expected: yup.string('Введіть породу собаки').required(`Поле є обов'язковим`),
})

export default validationSchema
