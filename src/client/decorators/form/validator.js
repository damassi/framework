/**
 * Validation system for use with the @form decorator. When @form components require
 * validation, individual `validate` methods are stored here, and when we go to
 * submit, each validator is called and `formData` is passed through. Errors are
 * accumulated and then displayed in the component.
 *
 * See decorators/creatable.js and decorators/editable.js for a reference implementation.
 */

import invariant from 'invariant'
import { isEmpty, isObject } from 'lodash'

const singleton = (() => {
  let instance = undefined

  const create = () => validator()

  return {
    get() {
      if (!instance) {
        instance = create()
      }

      return instance
    }
  }
})()

/**
 * NOTE:
 *
 * Validator should only be used in conjunction with the @form decorator. When
 * working with standard @reduxForm() wrappers this is unnecessary since we don't
 * need to stitch together multiple forms. Modals are a good example of vanilla form
 * implementations, where resource forms (Assignments, Vendors, Contracts) use the
 * below.
 */

function validator() {
  let validations = []

  function add(formValidation) {
    if (!isObject(formValidation) || !formValidation.validateFn) {
      return false
    }

    const { validateFn, formTrigger } = formValidation

    invariant(validateFn && formTrigger,
      '(client/decorators/form/validator.js) \n' +
      'Error adding validator: validator must contain keys `validateFn` and `formTrigger`'
    )

    validations = validations.concat([formValidation])
  }

  function remove({ key }) {
    validations = validations.filter(v => key !== v.key)
  }

  function validate(formData) {
    if (isEmpty(validations)) {
      return false
    }

    const errors = validations
      .reduce((errorMap, formValidation) => {
        const { validateFn, formTrigger } = formValidation

        // Call trigger to touch form fields and yield visual errors for form fields
        // that are incomplete. This may go away with future redux-form releases, as the
        // author may include a `dispatch(validate(formName))` action which is currently
        // absent.

        formTrigger()

        return {
          ...errorMap,
          ...validateFn(formData)
        }
      }, {})

    if (!isEmpty(errors) && (window.__LOGGING_ENABLED__ || __DEV__)) {
      /* eslint no-console: 0 */

      console.warn(
        '(client/decorators/form/validator.js) \n' +
        'Invalid form fields: ', errors
      )
    }

    return errors
  }

  return {
    add,
    remove,
    validate
  }
}

export default singleton
