import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Panel } from 'react-bootstrap'
import { cloneDeep } from 'lodash'
import form from 'client/decorators/form/form'
import validateClassNames from 'client/components/shared/utils/validate/validateClassNames'
import validateErrorText from 'client/components/shared/utils/validate/validateErrorText'
import getResourceKey from 'client/utils/getResourceKey'
import { fetchPhotographers } from 'client/components/shared/utils/fetch'
import exportMultiPanel from 'client/widgets/multi-panel/utils/exportMultiPanel'
import RequiredFieldIndicator from 'client/components/shared/RequiredFieldIndicator'
import Selector from 'client/components/shared/Selector'
import MultiPanel from 'client/widgets/multi-panel/MultiPanel'
import EmailAggregator from 'client/widgets/email-aggregator/EmailAggregator.js'

import TakeListPanel, {
  fields as takeListFields
} from 'client/components/resources/example/form/panels/TakeListPanel'

@connect(state => ({
  resourceKey: getResourceKey(state.routing.path),
}))
@form({
  formName: 'basicExampleForm',
  fields: [
    'name',
    'description',
    'photographers',
    'recipients',
    'assignment_take'
  ],
  initialValues: {},
  serialize: onUpdate,
  deserialize: onEditLoad,
  validate
})
export default class BasicForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    resourceKey: PropTypes.string.isRequired
  };

  render() {
    const { fields } = this.props

    return (
      <Panel header='Basic Info'>
        <form className='form-horizontal'>

          <div className={validateClassNames(fields.name)}>
            <label {...fields.name} className='col-sm-3 control-label' htmlFor='name'>
              Name
              <RequiredFieldIndicator />
            </label>
            <div className='col-sm-9'>
              <input {...fields.name} id='name' type='text' className='form-control' />
              <p className='help-block'>
                {validateErrorText(fields.name)}
              </p>
            </div>
          </div>

          <div className={validateClassNames(fields.description)}>
            <label {...fields.description} className='col-sm-3 control-label' htmlFor='description'>
              Description
              <RequiredFieldIndicator />
            </label>
            <div className='col-sm-9'>
              <input {...fields.description} id='description' type='text' className='form-control' />
              <p className='help-block'>
                {validateErrorText(fields.description)}
              </p>
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='issue' className='col-sm-3 control-label'>
              Photographers
            </label>
            <div className='col-sm-9'>

              <Selector
                ref='photographers'
                placeholder='Find a photographer...'
                name='form-field-name'
                minimumInput={2}
                aria-describedby='issueHelpBlock'
                id='issue'
                loadOptions={
                  fetchPhotographers({
                    active: fields.photographers.active
                  })
                }
                {...fields.photographers}
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='issue' className='col-sm-3 control-label'>
              Email Recipients
            </label>
            <div className='col-sm-9'>
              <EmailAggregator
                {...fields.recipients}
              />
            </div>
          </div>

          <MultiPanel
            label={'Takes / Shot List'}
            formFields={takeListFields}
            panelItems={fields.assignment_take.value}
            onFormUpdate={fields.assignment_take.onUpdate}>

              <TakeListPanel />
          </MultiPanel>

        </form>
      </Panel>
    )
  }
}

function onUpdate(formData) {
  let out = cloneDeep(formData)

  out = exportMultiPanel(out, [
    'assignment_take',
  ])

  return out
}

function onEditLoad(formData) {
  const out = cloneDeep(formData)

  return out
}

function validate(formData) {
  const errors = {}

  if (!formData.name) {
    errors.name = 'Required.'
  }

  if (!formData.description) {
    errors.description = 'Required.'
  }

  return errors
}
