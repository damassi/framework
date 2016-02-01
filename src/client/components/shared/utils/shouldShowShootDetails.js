export default function shouldShowShootDetails(formData) {
  const out = formData && [
    'Commissioned',
    'Staff'
  ].some(type => type === formData.photoAssignment_type)

  return out
}
