export default function validateErrorText(field) {
  if (field.touched && field.error) {
    return field.error
  }

  return null
}
