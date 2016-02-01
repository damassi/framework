import { expect } from 'chai'
import getDate from 'client/components/shared/utils/getDate'

describe('(client/components/shared/utils/getDate.js)', () => {
  it('should get a properly formatted date', () => {
    expect(getDate('Dec 21st 2012')).to.eql('12/21/2012')
    expect(getDate('12-21-2012')).to.eql('12/21/2012')
    expect(getDate('2012-12-21')).to.eql('12/21/2012')
  })
})
