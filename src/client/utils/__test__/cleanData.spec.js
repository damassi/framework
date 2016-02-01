import { expect } from 'chai'
import cleanData from 'client/utils/cleanData'

describe('(client/utils/cleanData.js)', () => {
  it('should trim strings that contain whitespace', () => {
    const data = {
      name: 'Hello how are you     ',
      description: 'Some description ',
      user: [
        {
          bio: 'Some bio      '
        }
      ]
    }

    expect(cleanData(data).name).to.equal('Hello how are you')
    expect(cleanData(data).description).to.equal('Some description')
    expect(cleanData(data).user[0].bio).to.equal('Some bio')
  })

  it('should set all empty strings to undefined', () => {
    const data = {
      name: '',
      description: 'description',
      user: [
        {
          bio: '',
          status: 'some status'
        }
      ]
    }

    expect(cleanData(data).name).to.equal(undefined)
    expect(cleanData(data).description).to.equal('description')
    expect(cleanData(data).user[0].bio).to.equal(undefined)
  })

  it('should set all empty arrays to undefined', () => {
    const data = {
      name: []
    }

    expect(cleanData(data).name).to.equal(undefined)
  })
})
