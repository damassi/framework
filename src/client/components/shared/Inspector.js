import React, { Component, PropTypes } from 'react'
import JSONInspector from 'react-json-inspector'

const ENABLED = __DEV__

export default class Inspector extends Component {

  static propTypes = {
    label: PropTypes.string,
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])
  };

  static defaultProps = {
    label: ''
  };

  handleClick(node) {
    /* eslint no-console: 0 */

    console.log(node)
    console.log(JSON.stringify(node.value))
  }

  render() {
    const data = this.props.data || {}

    return (
      !ENABLED ? null :

      <div>
        <br />
        <h4>
          {this.props.label}
        </h4>
        <JSONInspector
          onClick={this.handleClick.bind(this)}
          data={data}
        />
      </div>
    )
  }
}
