import { expect } from 'chai'
import namespaceActionsMap from 'client/utils/namespaceActionsMap'

describe('(client/utils/namespaceActionsMap.js)', () => {
  it('should namespace actionsMap by resourceKey', () => {
    const actionsMap = {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    }

    expect(
      namespaceActionsMap(actionsMap, 'assignments')
    ).to.eql({
      fooAssignments: 'foo',
      barAssignments: 'bar',
      bazAssignments: 'baz'
    })

    expect(
      namespaceActionsMap(actionsMap, 'vendors')
    ).to.eql({
      fooVendors: 'foo',
      barVendors: 'bar',
      bazVendors: 'baz'
    })
  })

  it('should throw an error invalid parameters are passed in', () => {
    expect(() =>
      namespaceActionsMap()
    ).to.throw(
      'Error namespacing actionsMap'
    )

    expect(() =>
      namespaceActionsMap('foo')
    ).to.throw(
      'Error namespacing actionsMap'
    )

    expect(() =>
      namespaceActionsMap('foo', 'bar')
    ).to.throw(
      'Error namespacing actionsMap'
    )

    expect(() =>
      namespaceActionsMap(undefined, 'bar')
    ).to.throw(
      'Error namespacing actionsMap'
    )
  })
})
