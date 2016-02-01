/* eslint no-unused-vars: 0 */

import { expect } from 'chai'
import React, { Component } from 'react'
import configureStore from 'client/utils/configureStore'
import member from 'client/decorators/member'
import initResourceReducer from 'client/reducers/resourceReducer'
import { renderDecorator } from 'client/utils/helpers/testHelpers'

describe('(client/decorators/member.js)', () => {

  // @member('assignments')
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
  //   app: {
  //     showPreloader: false
  //   },
  //   // params: {
  //   //   providerId: 'assignmentProviderId'
  //   // },
  //   // location: {
  //   //   pathname: 'path'
  //   // },
  //   assignments: {
  //     ...assignments._initialState,
  //     member: {
  //       $name: 'chris'
  //     }
  //   }
  // })
  //
  // it('should decorate component with props', () => {
  //   const { component } = renderDecorator(
  //     <Form store={store} />
  //   )
  //
  //   expect(component.props.member).to.eql({ $name: 'chris' })
  //   expect(component.props.resourceKey).to.eql('assignments')
  // })
})
