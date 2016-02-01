import { expect } from 'chai'
import getInitialState from 'client/widgets/multi-panel/utils/getInitialState'

describe('(client/components/shared/utils/getInitialState.js)', () => {
  it('should reset data by grabbing first item and setting keys to empty strings', () => {
    const data = [
      {
        __panelId: 0,
        name: 'hey',
        age: 'now'
      },
      {
        __panelId: 0,
        name: 'hey',
        age: 'now'
      }
    ]

    expect(getInitialState(data)).to.eql([{
      __panelId: 0,
      name: '',
      age: ''
    }])
  })
})
