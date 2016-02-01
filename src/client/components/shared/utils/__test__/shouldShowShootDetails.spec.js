import { expect } from 'chai'
import shouldShowShootDetails from 'client/components/shared/utils/shouldShowShootDetails'

describe('(client/components/shared/utils/shouldShowShootDetails.js)', () => {
  it('should return true if certain values are present', () => {
    expect(
      shouldShowShootDetails({
        photoAssignment_type: 'Commissioned'
      })
    ).to.eql(true)

    expect(
      shouldShowShootDetails({
        photoAssignment_type: 'Staff'
      })
    ).to.eql(true)

    expect(
      shouldShowShootDetails({
        photoAssignment_type: 'Not In'
      })
    ).to.eql(false)
  })
})
