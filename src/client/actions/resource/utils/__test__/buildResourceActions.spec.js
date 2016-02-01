/* eslint no-unused-vars: 0 */

import { expect } from 'chai'
import buildResourceActions from 'client/actions/resource/utils/buildResourceActions'

describe('(client/actions/resource/utils/buildResourceActions.js)', () => {

  it('should build resource actions', () => {
    const actions = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    }

    const actionsMap = () => {
      return {
        ...actions
      }
    }

    expect(
      buildResourceActions(actionsMap, ['test'])
    ).to.eql({
      test: {
        ...actions
      }
    })
  })

  it('should throw error if incorrect parameters', () => {
    expect(() =>
      buildResourceActions()
    ).to.throw(
      'Error building resource actions'
    )

    expect(() =>
      buildResourceActions('hey')
    ).to.throw(
      'Error building resource actions'
    )

    expect(() =>
      buildResourceActions(() => {}, 'hey')
    ).to.throw(
      'Error building resource actions'
    )
  })
})
