import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import getResourceKey from 'client/utils/getResourceKey'
import getResourceConfig from 'shared/utils/getResourceConfig'
import Inspector from 'client/components/shared/Inspector'
import BasicForm from 'client/components/resources/example/form/BasicForm'


@connect(state => ({
  resourceKey: getResourceKey(state.routing.path),
}))
export default class VendorForm extends Component {

  static propTypes = {
    formData: PropTypes.object.isRequired,
    resourceKey: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updateFormAction: PropTypes.func.isRequired,

    create: PropTypes.func,
    edit: PropTypes.func,
    member: PropTypes.object,
    providerId: PropTypes.string,
    remove: PropTypes.func,
  };

  prepareToSave() {
    const { formData, resourceKey } = this.props
    const { entityType } = getResourceConfig(resourceKey)

    const out = {
      ...formData,
      $type: [{
        $id: `type/${entityType}`
      }]
    }

    return out
  }

  handleCreateClick() {
    const { create } = this.props
    const out = this.prepareToSave()

    create(out)
  }

  handleEditClick() {
    const { edit } = this.props
    const out = this.prepareToSave()

    edit(out)
  }

  handleRemoveClick() {
    const { providerId, remove } = this.props
    remove(providerId)
  }

  handleCancelClick() {
    window.history.back()
  }

  render() {
    const { edit, formData, title, updateFormAction } = this.props

    const formType = edit
      ? 'Save Changes to'
      : 'Save'

    const actionHandler = edit
      ? this.handleEditClick
      : this.handleCreateClick

    return (
      <div className='create-view'>
        <h2>
          {title}
        </h2>

        <BasicForm
          {...this.props}
          updateFormAction={updateFormAction}
        />

        <Button onClick={actionHandler.bind(this)} bsStyle='primary' className='m-r'>
          {formType}
        </Button>

        <Button onClick={this.handleCancelClick.bind(this)} bsStyle='default'>
          Cancel
        </Button>

        { edit &&
          <Button onClick={this.handleRemoveClick.bind(this)} bsStyle='danger' className='pull-right'>
            Remove
          </Button> }

        {/* Switch boolean to true to see incoming form data */}
        { false &&
          <Inspector
            label={'Incoming form data'}
            data={formData}
          /> }

      </div>
    )
  }
}
