/* eslint no-unused-vars: 0 */

import { expect } from 'chai'
import React, { Component } from 'react'
import configureStore from 'client/utils/configureStore'
import creatable from 'client/decorators/creatable'
import initResourceReducer from 'client/reducers/resourceReducer'
import { renderDecorator } from 'client/utils/helpers/testHelpers'

describe('(client/decorators/creatable.js)', () => {

  // @creatable('assignments')
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
  //     <Form store={store} />
  //   )
  //
  //   expect(component.props.formData).to.eql({ name: 'chris' })
  // })
})
