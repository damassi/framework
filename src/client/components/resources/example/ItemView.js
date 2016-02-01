import React, { Component, PropTypes } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import Inspector from 'client/components/shared/Inspector'
import Exists from 'client/components/shared/Exists'
import member from 'client/decorators/member'
import Basics from 'client/components/resources/example/item-view/Basics'

@member('example', { fetch: true })
export default class ItemView extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    edit: PropTypes.func.isRequired,
    member: PropTypes.object.isRequired,
    resourceKey: PropTypes.string.isRequired,
    providerId: PropTypes.string
  };

  render() {
    const {
      member,
      member: {
        name
      },
      edit
    } = this.props

    return (
      <div className='item-view'>
        <div className='row'>
          <div className='col-xs-6' >
            <dl className='item-view-heading'>
              <Exists prop={name}>
                <div debug='company_agency'>
                  <h2>
                    {name}
                  </h2>
                </div>
              </Exists>
            </dl>
          </div>

          <div className='col-xs-6'>
            <ButtonToolbar>
              <Button onClick={edit} className='pull-right'>
                Edit
              </Button>
            </ButtonToolbar>
          </div>
        </div>

        <Basics />

        <Inspector
          data={member}
        />
      </div>
    )
  }
}
