import React, { Component, PropTypes } from 'react'
import { createStore } from 'redux'
import { cloneDeep, isEmpty, isUndefined, memoize } from 'lodash'
import invariant from 'invariant'
import classNames from 'classnames'
import multiPanelReducer from 'client/widgets/multi-panel/multiPanelReducer'
import * as multiPanelActions from 'client/widgets/multi-panel/multiPanelActions'
import AddButton from 'client/widgets/multi-panel/AddButton'
import EmailIndicator from 'client/components/shared/EmailIndicator'

export default class MultiPanel extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    formFields: PropTypes.array.isRequired,
    initialData: PropTypes.array,
    label: PropTypes.string,
    hasEmailIndicator: PropTypes.bool,
    onFormUpdate: PropTypes.func.isRequired,
    className: PropTypes.string,
    panelItems: PropTypes.array,
    resetable: PropTypes.bool
  };

  static defaultProps = {
    className: 'form-group',
    panelItems: [],
    resetable: true
  };

  componentWillMount() {
    const { formFields, panelItems } = this.props

    const initialState = normalizePanels(
      panelItems.map(panel => ({
        ...fieldsToKeys(formFields),
        ...panel,
      })))

    this.store = createStore(multiPanelReducer, initialState)
  }

  componentDidMount() {
    const { formFields, onFormUpdate } = this.props

    this.unsubscribe = this.store.subscribe(() => {
      const multiPanels = this.store.getState()

      onFormUpdate(multiPanels)
    })

    const panelItems = this.store.getState()

    if (isEmpty(panelItems)) {
      this.store.dispatch(multiPanelActions.add(fieldsToKeys(formFields)))
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleChange() {
    this.props.onFormUpdate(this.store.getState())
  }

  render() {
    const {
      className,
      formFields,
      label,
      resetable,
      hasEmailIndicator
    } = this.props

    const panelItems = normalizePanels(this.store.getState())

    const onUpdate = {
      onFocus: this.handleChange.bind(this),
      onBlur: this.handleChange.bind(this)
    }

    return (
      <div className={className} {...onUpdate}>

        { label &&
          <div className='col-sm-3 control-label text-bold'>
            {label}
            { hasEmailIndicator &&
              <EmailIndicator /> }
          </div> }

        <div className={classNames({ 'col-sm-9': label })}>

          { // Iterate over all panel items in state
            panelItems.map((item, index) => {
              invariant(this.props.children,
                'Error creating <MultiPanel />: <PanelItem /> child element not found.'
              )

              // Instantiate a new <PanelItem />
              return React.Children.map(this.props.children, (Panel) => {
                const id = item.__panelId
                const key = `panelItem-${id}`

                return React.cloneElement(Panel, {
                  formKey: key,
                  id,
                  index: index + 1,
                  initialValues: item,
                  key,
                  label,
                  panelDispatch: this.store.dispatch,
                  showReset: resetable,
                  showRemove: panelItems.length > 1
                })
              })
            }
          )}

          <AddButton
            formFields={fieldsToKeys(formFields)}
            panelDispatch={this.store.dispatch}
          />
        </div>
      </div>
    )
  }
}

const fieldsToKeys = memoize((formFields) => {

  // Create an object tree out of ['form', 'fields'] in order to
  // build display tree. Outputs -> { form: '', fields: '' }

  const fields = formFields.reduce(
    (props, key) => ({
      [key]: '',
      ...props
    }), {})

  return fields
}, (x) => JSON.stringify(x))

const normalizePanels = memoize((panels) => {
  let out = cloneDeep(panels)

  const needKeys = out.some(p => isUndefined(p.__panelId))

  if (needKeys) {
    out = out.map((item, index) => ({
      __panelId: index,
      ...item
    }))
  }

  return out
}, (x) => JSON.stringify(x))
