import { expect } from 'chai'
import keyInReducer from 'client/reducers/utils/keyInReducer'
import getResourceConfig from 'shared/utils/getResourceConfig'

describe('(client/reducers/utils/keyInReducer.js)', () => {
  it('should return true if key is found in reducer', () => {
    const testResource = getResourceConfig('test')

    expect(
      keyInReducer(testResource.resourceKey)
    ).to.eql(true)
  })

  it('should return false if key is not found in reducer', () => {
    expect(
      keyInReducer('notFound')
    ).to.eql(false)
  })

  it('should throw error if key not provided', () => {
    expect(() =>
      keyInReducer()
    ).to.throw('Error validating key in reducer')
  })
})
