import React, { PropTypes } from 'react'

const ZeroState = ({ text, link }) =>
  <li className='text-center'>
    {text} {link}
  </li>

ZeroState.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.element.isRequired
}

export default ZeroState
