import { expect } from 'chai'
import isNumberKey from 'client/components/shared/utils/isNumberKey'

describe('(client/components/shared/utils/isNumberKey.js)', () => {
  it('should return true if number and false if string', () => {
    const key = (input) => String(input).charCodeAt(0)

    expect(isNumberKey({ keyCode: key('a') })).to.eql(false)
    expect(isNumberKey({ keyCode: key('b') })).to.eql(false)
    expect(isNumberKey({ keyCode: key(1) })).to.eql(true)
    expect(isNumberKey({ keyCode: key(0) })).to.eql(true)
  })
})
