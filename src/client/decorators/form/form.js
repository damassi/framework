/**
 * Decorator to be used when creating forms. This serves as a high-level wrapper around
 * redux-form, enabling us to stitch together longer forms into a single piece,
 * validation, and more.
 *
 *     USAGE:
 *
 *     @form({
 *       formName: 'basicExampleForm',
 *       fields: [
 *         'name',
 *         'description',
 *         'photographers',
 *         'recipients',
 *         'assignment_take'
 *       ],
 *       initialValues: {
 *         name: 'Wolfee'
 *       },
 *       serialize: (formData) => {
 *         // Transform form data here before its sent to the reducer for save. Updates
 *         // after every change to the form
 *       },
 *       deserialize: (formData) => {
 *         // Transform the data as it is returned from the server when edit first loads
 *       }
 *       validate: (formData) {
 *         const errors = {}
 *
 *         if (!formData.name) {
 *           errors.name = 'Required.'
 *         }
 *
 * 				 return errors
 *       }
 *     })
 *     export default class BasicForm extends Component {
 *        ...
 *     }
 *
 * TODO:
 *
 * There are some low-level performance issues related to redux-form that become
 * apparent when building out large forms. Here and there things are memoized, but a
 * better solution would be to use the library reselect (https://github.com/rackt/reselect).
 * This provides an interface for caching @connect() selectors, which might be helpful
 * within each individual form component. Not sure if this is the best way to overcome
 * the issue, but it might be a start. See redux-form issues for more info.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm, initialize as initializeReduxForm } from 'redux-form'
import invariant from 'invariant'
import { first, isArray, isEqual, isFunction, memoize, reduce } from 'lodash'
import getFormData from 'client/components/shared/utils/getFormData'
import isMounted from 'client/components/shared/utils/isMounted'
import validator from 'client/decorators/form/validator'

const getReduxFormData = memoize(_getReduxFormData, (x) => JSON.stringify(x))

export default function form({
  formName,
  fields,
  initialValues = {},
  serialize = x => x,
  deserialize,
  validate
}) {

  return (Form) => {

    invariant(formName,
      '(decorators/form.js) \n' +
      'Error initializing @form decorator: \`formName\` is undefined. Did you forget ' +
      `to pass in @form({ formName: 'formName' }) to your <${Form.name} /> component?`
    )

    invariant(fields && isArray(fields),
      '(decorators/form.js) \n' +
      'Error initializing @form decorator: \`fields\` is not an array of field names or ' +
      `undefined. Did you forget to pass in @form({ fields: [...] }) to your <${Form.name} /> component?`
    )

    @reduxForm({
      form: formName,
      fields,
      initialValues,
      validate
    })
    @connect(state => ({
      reduxFormData: getReduxFormData(state.form[formName])
    }))
    class FormDecorator extends Component {

      static propTypes = {
        destroyForm: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        pristine: PropTypes.bool.isRequired,
        reduxFormData: PropTypes.object.isRequired,
        updateFormAction: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,

        edit: PropTypes.func,
        member: PropTypes.object
      };

      state = {
        deserializeBeforeRender: false
      };

      componentWillMount() {
        const { edit, handleSubmit, pristine } = this.props

        const shouldDeserialize = edit && pristine
          ? true
          : false

        const formMode = shouldDeserialize
          ? 'edit'
          : 'create'

        this.setState({
          deserializeBeforeRender: shouldDeserialize,
          formMode
        })

        // Add validator to get around lack of VALIDATE action within redux-form. This
        // allows us to validate independent form entities, and split up form entities.
        validator.get().add({
          key: formName,
          validateFn: validate,
          formTrigger: handleSubmit(() => {})
        })
      }

      componentDidMount() {
        /* eslint react/no-did-mount-set-state: 0 */

        if (this.state.deserializeBeforeRender) {
          this.deserializeFormData()

          this.setState({
            deserializeBeforeRender: false
          })

          // And once the deserialization process completes, fire a change event and
          // immediately reserialize for further updates / saves:

          setTimeout(() => {
            this.dispatchChange(this.props.values)
          })
        }
      }

      componentDidUpdate(prevProps) {
        const updateResourceFormState = (
          !isEqual(
            prevProps.reduxFormData,
            this.props.reduxFormData) &&

          !this.state.deserializeBeforeRender
        )

        if (updateResourceFormState) {
          this.dispatchChange(this.props.reduxFormData)
        }
      }

      componentWillUnmount() {
        validator.get().remove({
          key: formName
        })

        this.props.destroyForm()
      }

      deserializeFormData() {
        const {
          dispatch,
          fields,
          member,
          updateFormAction
        } = this.props

        let formData = getFormData(fields, member)

        if (deserialize) {
          invariant(isFunction(deserialize),
            '(decorators/form.js) \n' +
            'Error deserializing form: `deserialize` must be a function.'
          )

          formData = deserialize(formData)
        }

        const withData = {
          ...fields,
          ...formData
        }

        const formFields = Object.keys(fields)

        // Prepopulate redux form with data
        dispatch(initializeReduxForm(formName, withData, formFields))

        // Trigger update in order to sync global form state for resource
        setTimeout(() => {
          dispatch(updateFormAction(withData))

          isMounted(this) && this.setState({
            deserializeBeforeRender: false
          })
        })
      }

      dispatchChange(values) {
        const { dispatch, updateFormAction } = this.props

        dispatch(updateFormAction({
          ...serialize(values)
        }))
      }

      render() {
        const { deserializeBeforeRender } = this.state

        return (
          deserializeBeforeRender ? null :

          <div>
            <Form
              {...this.props}
              dispatchChange={this.dispatchChange.bind(this)}
              deserializeBeforeRender={this.state.deserializeBeforeRender}
              formMode={this.state.formMode}
              ref={formName}
            />
          </div>
        )
      }
    }

    return FormDecorator
  }
}

// Extract redux form data from the form reducer and send it down the wire into the
// resource reducer for management.

function _getReduxFormData(formData) {
  const out = reduce(formData, (formMap, value, key) => {
    const isPrivateProp = first(key) === '_'

    // Exclude redux-form related library properties
    if (isPrivateProp) {
      return formMap
    }

    return {
      [key]: value.value,
      ...formMap
    }
  }, {})

  return out
}
