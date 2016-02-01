import { expect } from 'chai'

import {
  serializeSelectValues,
  deserializeSelectValues
} from 'client/components/shared/utils/selectUtils'

describe('(client/components/shared/utils/selectUtils.js)', () => {
  it('should serialize select values on create', () => {
    expect(serializeSelectValues([
      {
        value: 0
      },
      {
        value: 1
      }
    ])).to.eql([
      {
        $id: 0,
      },
      {
        $id: 1
      }
    ])
  })

  it('should deserialize select values on edit', () => {
    expect(deserializeSelectValues([
      {
        $name: 'Chris',
        $id: 0
      },
      {
        $name: 'Katherine',
        $id: 1
      }
    ])).to.eql([
      {
        label: 'Chris',
        value: 0
      },
      {
        label: 'Katherine',
        value: 1
      }
    ])
  })

  it('should return false when an array is not passed', () => {
    expect(serializeSelectValues({})).to.eql(false)
    expect(serializeSelectValues('chris')).to.eql(false)
    expect(deserializeSelectValues({})).to.eql(false)
    expect(deserializeSelectValues('katherine')).to.eql(false)
  })
})
