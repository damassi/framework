import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import * as multiPanelActions from 'client/widgets/multi-panel/multiPanelActions'
import { uniqueId } from 'lodash'
import PanelHead from 'client/widgets/multi-panel/PanelHead'
import Calendar from 'client/widgets/calendar/Calendar'

export const fields = [
  'city',
  'country',
  'date',
  'description',
  'name',
  'state',
  'story_code',
  'venue',
]

@reduxForm({
  form: `takeList-${uniqueId()}`,
  fields
})
export default class TakeListPanel extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    panelDispatch: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired
  };

  handleChange() {
    const {
      id,
      panelDispatch,
      values
    } = this.props

    panelDispatch(multiPanelActions.update(id, values))
  }

  render() {
    const { fields, label } = this.props

    const onUpdate = {
      onFocus: this.handleChange.bind(this),
      onBlur: this.handleChange.bind(this)
    }

    return (
      <div className='form-well' {...onUpdate}>

        <PanelHead
          label={label}
          {...this.props}
        />

        <div className='form-well-body' {...onUpdate}>
          <div className='row'>
            <div className='form-group col-sm-8'>
              <label htmlFor='shotListName'>
                Name
              </label>
              <input {...fields.name} type='text' className='form-control' />
            </div>
            <div className='form-group col-sm-4'>
              <label htmlFor='shotListStoryCode'>
                Story Code
              </label>
              <input {...fields.story_code} type='text' className='form-control' />
            </div>
          </div>

          <div className='row'>
            <div className='form-group col-sm-12'>
              <label htmlFor='shotListDescription'>
                Description
              </label>
              <textarea {...fields.description} rows='3' className='form-control'></textarea>
            </div>
          </div>

          <div className='row'>
            <div className='form-group col-sm-6'>
              <label htmlFor='shotListVenue'>
                Venue
              </label>
              <input {...fields.venue} type='text' className='form-control' />
            </div>

            <div className='form-group col-sm-6'>
              <label htmlFor='date' className='control-label'>
                Shoot Date
              </label>
              <Calendar {...fields.date}>
                <input id='date' type='text' className='form-control' placeholder='mm/dd/yy' />
              </Calendar>
            </div>
          </div>

          <div className='row'>
            <div className='form-group col-sm-6'>
              <label htmlFor='shotListCity'>
                City
              </label>
              <input {...fields.city} type='text' className='form-control' />
            </div>

            <div className='form-group col-sm-2'>
              <label htmlFor='shotListState'>
                State
              </label>
              <input {...fields.state} type='text' className='form-control' />
            </div>
            <div className='form-group col-sm-4'>
              <label htmlFor='shotListCountry'>
                Country
              </label>
              <input {...fields.country} type='text' className='form-control' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
