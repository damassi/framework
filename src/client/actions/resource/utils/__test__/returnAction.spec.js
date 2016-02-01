/* eslint no-unused-vars: 0 */

import { expect } from 'chai'
import returnAction from 'client/actions/resource/utils/returnAction'

describe('(client/actions/resource/utils/returnAction.js)', () => {

  it('should return a resourceAction', () => {
    expect(returnAction('get', 'test')).to.be.instanceof(Function)
    expect(returnAction('search', 'test')).to.be.instanceof(Function)
    expect(returnAction('get', 'test')).to.be.instanceof(Function)
    expect(returnAction('edit', 'test')).to.be.instanceof(Function)
  })

  it('should throw error if key not found in reducer', () => {
    expect(() =>
      returnAction('foo', 'test')
    ).to.throw(
      'Error returning action'
    )
  })
})
