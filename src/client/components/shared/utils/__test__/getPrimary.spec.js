import { expect } from 'chai'
import getPrimary from 'client/components/shared/utils/getPrimary'

describe('(client/components/shared/utils/getPrimary.js)', () => {
  it('should search on an object and return the primary field', () => {
    const address = [
      {
        name: 'chris'
      },
      {
        name: 'katherine',
        primary: true
      }
    ]

    expect(getPrimary(address)).to.eql(address[1])
  })

  it('should return false if array not passed as a parameter', () => {
    expect(getPrimary({ name: 'foo' })).to.eql(false)
  })
})
