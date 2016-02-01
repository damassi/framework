export default function validateClassNames(fields) {
  const classNames = 'form-group'
  const { error, touched } = fields

  if (error && touched) {
    return `${classNames} has-error`
  }

  return classNames
}
