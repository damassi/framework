import React, { Component, PropTypes } from 'react'
import { every, isArray, isObject, isUndefined } from 'lodash'

const DEBUG = __DEV__
const ENABLED = __DEV__

export default class Exists extends Component {

  static propTypes = {
    prop: PropTypes.any,
    children: PropTypes.element.isRequired,
    debug: PropTypes.string
  };

  render() {
    const { prop, children } = this.props

    let hide = false
    if (isArray(prop) || isObject(prop)) {
      if (every(prop, isUndefined)) {
        hide = true
      }
    } else {
      if (isUndefined(prop)) {
        hide = true
      }
    }

    let debugElement = null
    if (children.props && children.props.debug) {
      debugElement = (
        <div style={{ color: 'red' }}>
          {children.props.debug}
        </div>
      )
    }

    let out = null
    if (hide) {
      if (DEBUG) {
        out = debugElement
      } else {
        out = null
      }
    } else {
      out = children
    }

    return ENABLED ? out : children
  }
}
