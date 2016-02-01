import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { VelocityComponent } from 'velocity-react'

@connect(state => ({
  showPreloader: state.app.showPreloader,
  statusMsg: state.app.statusMsg || 'Loading...'
}))
export default class Preloader extends Component {

  static propTypes = {
    showPreloader: PropTypes.bool.isRequired,
    statusMsg: PropTypes.string.isRequired,
  };

  render() {
    const { showPreloader, statusMsg } = this.props

    return (
      <VelocityComponent
        duration={150}
        delay={showPreloader ? 0 : 100}
        easing={'easeInOut'}
        animation={showPreloader ? 'fadeIn' : 'fadeOut'}>

        <div className='preloader'>
          <span>
            {statusMsg}
          </span>
         </div>
      </VelocityComponent>
    )
  }
}
