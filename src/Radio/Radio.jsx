import {Component, h} from 'preact';
import {callHook} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import './Radio.less';

export default class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  handleFocus(e) {
    if (!this.state.isActive) this.setState({isActive: true});
    callHook(this.props, 'onFocus', e);
  }

  handleBlur(e) {
    if (this.state.isActive) this.setState({isActive: false});
    callHook(this.props, 'onBlur', e);
  }

  handleChange(e) {
    callHook(this.props, 'onChange', e, this.state.isActive);
  }

  render(props, state) {
    const {value} = props;
    const isChecked = value === true ||
      (value !== false && value != null && String(value).length > 0);

    const classList = TokenList.from('ui-radio');
    classList.add(props.color || 'primary');
    classList.add('ui-radio--label-position-' + (props.labelPosition || 'right'));
    if (state.isActive) classList.add('active');
    if (isChecked) classList.add('checked');
    if (props.disabled) classList.add('disabled');

    return (
      <label className={classList.toString()}>
        <div className="ui-radio__input-wrapper">
          <input
            className="ui-radio__input"
            type="radio"
            checked={isChecked}
            disabled={props.disabled}
            name={props.name}
            value={value === true ? 'on' : value === false ? 'off' : value}
            onBlur={e => this.handleBlur(e)}
            onFocus={e => this.handleFocus(e)}
            onChange={e => this.handleChange(e)}/>
          <div className="ui-radio__focus-ring"/>
          <div className="ui-radio__outer-circle"/>
          <div className="ui-radio__inner-circle"/>
        </div>

        {props.label
          ? <div className="ui-radio__label-text">{props.label}</div>
          : props.children}
      </label>
    );
  }
}
