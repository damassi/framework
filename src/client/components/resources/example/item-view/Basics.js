import React, { Component, PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
import member from 'client/decorators/member'
import Exists from 'client/components/shared/Exists'
import ListItemPair from 'client/components/shared/attr-val-list/ListItemPair'

@member('example')
export default class BasicForm extends Component {

  static propTypes = {
    member: PropTypes.object.isRequired
  };

  render() {
    const {
      member: {
        name,
        description
      }
    } = this.props

    return (
      <Panel header='Basics'>
        <ul className='attr-val-list avl-cols avl-cols-bold'>

          <Exists prop={name}>
            <ListItemPair
              attr='Name'
              val={name}
              debug={'name'}
            />
          </Exists>

          <Exists prop={description}>
            <ListItemPair
              attr='Description'
              val={description}
              debug={'description'}
            />
          </Exists>

        </ul>

      </Panel>
    )
  }
}
