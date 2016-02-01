// Via http://bl.ocks.org/insin/bbf116e8ea10ef38447b

const FIELD_EVENT_HANDLER = /^(?:on|handle)[A-Z]/

/**
 * Perform shallow equals comparison of two redux-form field objects to
 * determine if the field has changed.
 */
function fieldShallowEquals(field, nextField) {
  for (const prop in field) {
    // Ignore event handlers, as they continually get recreated by redux-form
    if (!FIELD_EVENT_HANDLER.test(prop) && field[prop] !== nextField[prop]) {
      return false
    }
  }
  return true
}

/**
 * Perform shallow equals comparison to determine if the props of the context
 * form field component have changed, with special-case handling for the "field"
 * prop, provided by redux-form.
 *
 * Use this as shouldComponentUpdate() on components which compose a
 * FormField in their render() method and they will only re-render when
 * necessary.
 */
export default function shouldFormFieldUpdate(nextProps) {
  const keys = Object.keys(this.props)
  const nextKeys = Object.keys(nextProps)

  if (keys.length !== nextKeys.length) {
    return true
  }

  const nextHasOwnProperty = Object.prototype.hasOwnProperty.bind(nextProps)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (
      !nextHasOwnProperty(key) ||
      key === 'field'
        ? !fieldShallowEquals(this.props[key], nextProps[key])
        : this.props[key] !== nextProps[key]
      ) {
      return true
    }
  }

  return false
}
