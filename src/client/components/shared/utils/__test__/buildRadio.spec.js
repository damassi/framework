import { expect } from 'chai'
import buildRadio from 'client/components/shared/utils/buildRadio'

describe('(client/utils/buildRadio.js)', () => {
  const getField = (value) => ({ name: { value } })

  it('should build a radio helper and default `checked` to false', () => {
    expect(
      buildRadio(getField(false), 'name')
    ).to.eql({
      value: false,
      checked: false
    })
  })

  it('should override default if `options.isDefault` is true and value is undefined', () => {
    expect(
      buildRadio(getField(undefined), 'name', { isDefault: true })
    ).to.eql({
      value: undefined,
      checked: true
    })
  })

  it('should set checked to true', () => {
    expect(
      buildRadio(getField(false), 'name', { condition: false })
    ).to.eql({
      value: false,
      checked: true
    })

    expect(
      buildRadio(getField(true), 'name', { condition: true })
    ).to.eql({
      value: true,
      checked: true
    })
  })
})
