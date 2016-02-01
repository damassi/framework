import React, { Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import classNames from 'classnames'
import fileExtension from 'file-extension'

export default class Attachment extends Component {

  static propTypes = {
    contentType: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    onRemove: PropTypes.func,
    publicUrl: PropTypes.string.isRequired,
  };

  handleRemoveClick() {
    this.props.onRemove(this.props.filename)
  }

  render() {
    const {
      filename,
      publicUrl,
      contentType,
      onRemove
    } = this.props

    const classes = classNames({
      removable: onRemove,
      attachment: true
    })

    return (
      <li className={classes}>
        { onRemove &&
          <Button bsSize='xsmall' className='pull-right' onClick={this.handleRemoveClick.bind(this)}>
            <span className='icon icon-cross'></span>
          </Button> }

          <a href={publicUrl} target='_blank' title={filename}>
            <span className='filetype-icon' data-filetype={fileExtension(filename)}></span>
            <div>
              <div className='attachment-name text-truncate'>{filename}</div>
              <div className='attachment-type text-truncate'>{contentType}</div>
            </div>
          </a>
      </li>
    )
  }
}
