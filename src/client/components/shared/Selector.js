import React, { Component } from 'react'
import Select from 'react-select'

// TODO:
//
// Refactor this. Hacky due to redux form interop, but can possibly
// be cleaned up. Also might be worth looking for a new component; ReactSelect
// is pretty bad.

export default class MultiSelect extends Component {
  /* eslint react/prop-types: 0 */

  render() {
    const {
      loadOptions, // async
      options, // sync
      value,
      onBlur,
      onChange,
      ...props
    } = this.props

    const SelectComponent = loadOptions
      ? Select.Async
      : Select

    const optionsType = loadOptions
      ? { loadOptions }
      : { options }

    return (
      <SelectComponent
        {...props}
        {...optionsType}
        multi
        value={value}
        className={this.props.max === 1 ? 'Select--multi-max1' : ''}
        onBlur={() => {}}
        onChange={(items) => {
          const { max } = this.props

          // Hack to get around React Selects inability to pass single items with values
          // and labels. Might be fixed after beta is out.
          if (!max) {
            return onChange(items)
          } else if (max && items.length <= max) {
            return onChange(items)
          }
        }}
      />
    )
  }
}
