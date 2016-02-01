/* eslint no-unused-vars: 0 */

import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { expect } from 'chai'
import isMounted from 'client/components/shared/utils/isMounted'

describe('(client/components/shared/utils/isMounted.js)', () => {
  // it('should return true if component is mounted or false', (done) => {
  //   const container = document.createElement('div')
  //
  //   class MountComponent extends React.Component {
  //     componentDidMount() {
  //       expect(isMounted(this)).to.eql(true)
  //
  //       setTimeout(() => {
  //         unmountComponentAtNode(container)
  //         expect(isMounted(this)).to.eql(false)
  //         done()
  //       })
  //     }
  //
  //     render() {
  //       return (
  //         <div>hi</div>
  //       )
  //     }
  //   }
  //
  //   render(<MountComponent />, container)
  // })
})
