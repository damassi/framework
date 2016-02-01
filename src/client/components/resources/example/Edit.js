import React, { Component, PropTypes } from 'react'
import Inspector from 'client/components/shared/Inspector'
import member from 'client/decorators/member'
import editable from 'client/decorators/editable'
import ExampleForm from 'client/components/resources/example/form'

@member('example', { fetch: true })
@editable('example')
export default class Edit extends Component {

  static propTypes = {
    member: PropTypes.object.isRequired,
    edit: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
  };

  render() {
    const { member } = this.props

    return (
      !member ? null :

      <div className='create-view'>
        <ExampleForm
          {...this.props}
          title={'Edit'}
        />

        <Inspector
          data={member}
        />
      </div>
    )
  }
}
