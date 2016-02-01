import React, { Component, PropTypes } from 'react'
import EmailIndicator from 'client/components/shared/EmailIndicator'

export default class ListItemPair extends Component {

  static propTypes = {
    attr: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    val: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number, PropTypes.element]),
    valIsHtml: PropTypes.bool,
    inPhotographerEmail: PropTypes.bool
  };

  render() {
    const { attr, val, valIsHtml, inPhotographerEmail } = this.props
    return (
      <li>
        <div className='attr'>
          {attr}
          { inPhotographerEmail &&
            <EmailIndicator /> }
        </div>
        <div className='val'>
          { valIsHtml
            ? <div dangerouslySetInnerHTML={{ __html: val }}></div>
            : val
          }
        </div>
      </li>
    )
  }
}
