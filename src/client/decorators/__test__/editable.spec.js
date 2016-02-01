/* eslint no-unused-vars: 0 */

import { expect } from 'chai'
import React, { Component } from 'react'
import configureStore from 'client/utils/configureStore'
import editable from 'client/decorators/editable'
import initResourceReducer from 'client/reducers/resourceReducer'
import { renderDecorator } from 'client/utils/helpers/testHelpers'

describe('(client/decorators/editable.js)', () => {

  // @editable('assignments')
  // class Form extends Component {
  //   render() {
  //     return (
  //       <div>hi</div>
  //     )
  //   }
  // }
  //
  // const { assignments } = initResourceReducer(['assignments'])
  //
  // const store = configureStore({
  //   assignments: {
  //     ...assignments._initialState,
  //     form: {
  //       name: 'chris'
  //     }
  //   }
  // })
  //
  // it('should decorate component with props', () => {
  //   const { component } = renderDecorator(
  //     <Form
  //       store={store}
  //       member={{ props: {} }}
  //       resourceKey='assignments'
  //     />
  //   )
  //
  //   expect(component.props.edit).to.be.instanceof(Function)
  //   expect(component.props.formData).to.eql({ name: 'chris'})
  //   expect(component.props.remove).to.be.instanceof(Function)
  //   expect(component.props.updateFormAction).to.be.instanceof(Function)
  // })
})
