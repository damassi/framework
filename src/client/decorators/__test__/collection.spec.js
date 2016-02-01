/* eslint no-unused-vars: 0 */

import { expect } from 'chai'
import React, { Component } from 'react'
import configureStore from 'client/utils/configureStore'
import collection from 'client/decorators/collection'
import initResourceReducer from 'client/reducers/resourceReducer'
import { renderDecorator } from 'client/utils/helpers/testHelpers'

describe('(client/decorators/collection.js)', () => {

  // @collection('assignments')
  // class List extends Component {
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
  //   routing: {
  //     path: 'foo/bar/1'
  //   },
  //   session: {
  //     activeBrand: {
  //       $: {
  //         id: 'time'
  //       }
  //     }
  //   },
  //   assignments: {
  //     ...assignments._initialState,
  //     collection: {
  //       entities: [
  //         'foo',
  //         'bar',
  //         'baz'
  //       ],
  //       found: 3,
  //       start: 0
  //     }
  //   }
  // })
  //
  // it('should populate collection with entries', () => {
  //   const { component } = renderDecorator(
  //     <List store={store} />
  //   )
  //
  //   const { collection } = component.props
  //   expect(collection.entities.length).to.equal(3)
  // })
})
