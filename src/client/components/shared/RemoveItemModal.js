import React, { Component, PropTypes } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default class RemoveItemModal extends Component {

  static propTypes = {
    toggleModal: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired
  };

  remove() {
    const { handleRemove, toggleModal } = this.props
    handleRemove()
    toggleModal()
  }

  render() {
    const { toggleModal, showModal } = this.props

    return (
      <Modal animation={false} show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm Remove
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to remove this item? <strong>You cannot undo this action.</strong></p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={toggleModal}>
            Cancel
          </Button>
          <Button bsStyle='danger' onClick={this.remove.bind(this)}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
