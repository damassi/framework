/**
 * Used for @editable members.
 *
 * Takes a set of redux-form fields and grabs the corresponding member data to
 * reconstruct input data for edit.
 */

export default function getFormData(fields, member) {
  const out = Object.keys(fields)
    .reduce((fieldMap, field) => ({
      [field]: member[field],
      ...fieldMap
    }), {})

  return out
}
