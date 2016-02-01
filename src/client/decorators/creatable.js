/**
 * Decorator to be used for creating member entities within the DAM, keyed by resourceKey.
 *
 * TODO:
 *
 * This can be united with @editable, or even with @member, so that rather than three
 * decorators each with somewhat similar functionality, we can use only one.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import invariant from 'invariant'
import { isEmpty, isEqual } from 'lodash'
import returnAction from 'client/actions/resource/utils/returnAction'
import validator from 'client/decorators/form/validator'
import FormErrorsMessage from 'client/components/shared/FormErrorsMessage'

export default function creatable(resourceKey) {

  // TODO: Validation should be shared between creatable.js and editable.js. Might
  // want to push it into a higher order component / decorator.

  invariant(resourceKey,
    '(decorators/creatable.js) \n' +
    'Error decorating member: Cannot find `resourceKey`. Check your @creatable ' +
    'implementation.'
  )

  return (Create) => {

    @connect(state => ({
      formData: state[resourceKey].form
    }))
    class CreateDecorator extends Component {

      static propTypes = {
        dispatch: PropTypes.func.isRequired,
        formData: PropTypes.object.isRequired
      };

      state = {
        formErrors: undefined,
        showFormErrors: false
      };

      componentDidUpdate(prevProps) {
        const { formData } = this.props
        const { showFormErrors } = this.state

        if (showFormErrors && !isEqual(formData, prevProps.formData)) {
          const formErrors = validator.get().validate(formData)

          if (!isEmpty(formErrors)) {
            return this.setFormErrors(formErrors)
          }

          /* eslint react/no-did-update-set-state: 0 */
          this.setState({
            showFormErrors: false
          })
        }
      }

      setFormErrors(formErrors) {
        const errorFields = Object.keys(formErrors)[0]
        const el = document.getElementById(`form-group-${errorFields}`)

        if (el) {
          window.scrollTo(0, el.offsetTop - 60)
        }

        this.setState({
          formErrors,
        })
      }

      handleCreate(formData) {
        const { dispatch } = this.props
        const createFormAction = returnAction('create', resourceKey)

        const formErrors = validator.get().validate(formData)

        if (!isEmpty(formErrors)) {
          this.setState({
            showFormErrors: true
          })

          return this.setFormErrors(formErrors)
        }

        dispatch(createFormAction(formData))
      }

      render() {
        const updateFormAction = returnAction('updateForm', resourceKey)

        const {
          formErrors,
          showFormErrors
        } = this.state

        return (
          <div>
            <Create
              {...this.props}
              formData={this.props.formData}
              create={this.handleCreate.bind(this)}
              updateFormAction={updateFormAction}
              ref='wrappedComponent'
            />

            { showFormErrors &&
              <FormErrorsMessage formErrors={formErrors} /> }

          </div>
        )
      }
    }

    return CreateDecorator
  }
}
