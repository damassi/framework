import { expect } from 'chai'
import exportMultiPanel from 'client/widgets/multi-panel/utils/exportMultiPanel'

describe('(client/components/shared/utils/exportMultiPanel.js)', () => {
  it('should throw error if formData param is invalid', () => {
    expect(() =>
      exportMultiPanel()
    ).to.throw(
      'Error exporting <MultiPanel />'
    )

    expect(() =>
      exportMultiPanel('foo')
    ).to.throw(
      'Error exporting <MultiPanel />'
    )

    expect(() =>
      exportMultiPanel({ name: 'zzz' }, 222)
    ).to.throw(
      'Error exporting <MultiPanel />'
    )
  })

  it('should return form data unmodified if no multiPanel found', () => {
    const formData = {
      notFound: {
        __panelId: 0,
        name: 'melissa'
      }
    }

    expect(exportMultiPanel(formData, 'assignments')).to.eql(formData)
  })

  it('should remove `__panelId` prop from items', () => {
    const formData = {
      addresses: [
        {
          __panelId: 0,
          name: 'foo'
        },
        {
          __panelId: 1,
          name: 'bar'
        },
      ]
    }

    expect(exportMultiPanel(formData, 'addresses')).to.eql({
      addresses: [
        {
          name: 'foo'
        },
        {
          name: 'bar'
        }
      ]
    })
  })

  it('should remove empty values', () => {
    const formData = {
      addresses: [
        {
          __panelId: 0,
          name: '',
          address: '222',
          mailing: {
            box: ''
          }
        },
        {
          __panelId: 1,
          name: 'bar'
        },
      ]
    }

    expect(exportMultiPanel(formData, 'addresses')).to.eql({
      addresses: [
        {
          address: '222'
        },
        {
          name: 'bar'
        }
      ]
    })
  })

  it('should unset panel key from formData for empty', () => {
    const formData = {
      addresses: []
    }

    expect(exportMultiPanel(formData, 'addresses')).to.eql({
      addresses: undefined
    })
  })
})
