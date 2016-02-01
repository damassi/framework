/**
 * Decorator to be used for editing member entities within the DAM, keyed by resourceKey.
 *
 * TODO:
 *
 * This can be united with @creatable, or even with @member, so that rather than three
 * decorators each with somewhat similar functionality, we can use only one.
 */

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import invariant from 'invariant'
import { get, isEmpty, isEqual } from 'lodash'
import getProvider from 'client/utils/getProvider'
import validator from 'client/decorators/form/validator'
import returnAction from 'client/actions/resource/utils/returnAction'
import RemoveItemModal from 'client/components/shared/RemoveItemModal'
import FormErrorsMessage from 'client/components/shared/FormErrorsMessage'

export default function editable(resourceKey) {

  // TODO: Validation should be shared between creatable.js and editable.js. Might
  // want to push it into a higher order component / decorator.

  invariant(resourceKey,
    '(decorators/editable.js) \n' +
    'Error decorating member: Cannot find `resourceKey`. Check your @creatable ' +
    'implementation.'
  )

  const provider = getProvider(resourceKey)

  return (Edit) => {

    @connect(state => ({
      formData: state[resourceKey].form,
      formFields: state.form
    }))
    class EditableDecorator extends Component {

      static propTypes = {
        dispatch: PropTypes.func.isRequired,
        formData: PropTypes.object.isRequired,
        member: PropTypes.object.isRequired,
        resourceKey: PropTypes.string.isRequired,
      };

      state = {
        showRemoveItemModal: false,
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

      handleEdit(formData) {
        const { dispatch, member } = this.props
        const edit = returnAction('edit', resourceKey)

        const formErrors = validator.get().validate(formData)

        if (!isEmpty(formErrors)) {
          this.setState({
            showFormErrors: true
          })

          return this.setFormErrors(formErrors)
        }

        const providerProps = getProviderData(member, provider)
        dispatch(edit(providerProps.provider, providerProps.providerId, formData))
      }

      handleRemove() {
        const remove = returnAction('remove', resourceKey)

        const {
          dispatch,
          member
        } = this.props

        const providerProps = getProviderData(member, provider)
        dispatch(remove(providerProps.providerId))
      }

      toggleRemoveItemModal() {
        this.setState({
          showRemoveItemModal: !this.state.showRemoveItemModal
        })
      }

      render() {
        const updateFormAction = returnAction('updateForm', resourceKey)

        const {
          formErrors,
          showFormErrors,
          showRemoveItemModal
        } = this.state

        return (
          <div>
            <Edit
              {...this.props}
              formData={this.props.formData}
              edit={this.handleEdit.bind(this)}
              remove={this.toggleRemoveItemModal.bind(this)}
              updateFormAction={updateFormAction}
              ref='wrappedComponent'
            />
            <RemoveItemModal
              handleRemove={this.handleRemove.bind(this)}
              showModal={showRemoveItemModal}
              toggleModal={this.toggleRemoveItemModal.bind(this)}
            />

            { showFormErrors &&
              <FormErrorsMessage formErrors={formErrors} /> }
          </div>
        )
      }
    }

    return EditableDecorator
  }
}

function getProviderData(member, providerFromConfig) {
  let provider = providerFromConfig

  // Check to see if we're defining a static resource provider in `shared/configuration.js`;
  // if not, fetch it directly from the member.

  if (provider === '?') {
    provider = Object.keys(get(member, '$.providers'))[0]

    invariant(provider,
      '(client/decorators/editable.js) \n' +
      'Error getting provider: Provider not found.'
    )
  }

  const {
    $: {
      providers: {
        [provider]: providerId
      }
    },
  } = member

  return {
    provider,
    providerId
  }
}
