import React, { Component, PropTypes } from 'react'
import creatable from 'client/decorators/creatable'
import ExampleForm from 'client/components/resources/example/form'

@creatable('example')
export default class Create extends Component {

  static propTypes = {
    create: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className='create-view'>
        <ExampleForm
          {...this.props}
          title={'Create'}
        />
      </div>
    )
  }
}
