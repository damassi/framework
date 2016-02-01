import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { capitalize, compact } from 'lodash'
import { Dropdown, MenuItem } from 'react-bootstrap'
import { resources } from 'shared/configuration'

@connect(state => state)
export default class CreateButton extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  buildDropDownItems() {
    const dropDowns = resources.map(({ initialState }) => {
      const {
        resourceKey
      } = initialState

      return {
        label: capitalize(resourceKey),
        resourceKey
      }
    })

    return compact(dropDowns)
  }

  handleDropdownClick(resourceKey, event) {
    event.preventDefault()
    this.props.dispatch(pushPath(`/${resourceKey}/create`))
  }

  render() {
    return (
      <Dropdown id='create-dropdown'>
        <Dropdown.Toggle className='navbar-btn btn-header' bsStyle='primary' pullRight ref='filterDropdown'>
          Create&nbsp;
        </Dropdown.Toggle>
        <Dropdown.Menu>
          { this.buildDropDownItems().map((item, index) => {
            const { label, resourceKey } = item

            return (
              <MenuItem key={index.toString()} onClick={this.handleDropdownClick.bind(this, resourceKey)}>
                {label}
              </MenuItem>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
