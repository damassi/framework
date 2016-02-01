export default function isNumberKey(event) {
  const charCode = event.which
    ? event.which
    : event.keyCode

  if (
    charCode !== 46 && charCode > 31 &&
    (charCode < 48 || charCode > 57)
  ) {
    return false
  }

  return true
}
