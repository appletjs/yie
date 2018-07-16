import {Component, h} from 'preact';
import {makeAccessor} from '../shared/helpers';
import TokenList from '../shared/TokenList';
import Ripple from '../Ripple';
import Icon from '../Icon';
import Text from '../Text/Text';
import './BottomNavigation.less';
import StyleMap from '../shared/StyleMap';

const access = makeAccessor('primary,accent,danger,warning,info,success');
const CLASS_NAME = 'ui-bottom-navigation';

export default class BottomNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected
    };
  }

  componentWillReceiveProps({selected}) {
    if (selected !== this.state.selected) {
      this.setState({selected});
    }
  }

  proxyItemClick(selected, item) {
    return (e) => {
      const onItemClick = item.onClick || this.props.onItemClick;
      if (selected !== this.state.selected) this.setState({selected});
      if (typeof onItemClick !== 'function') return;
      onItemClick(e, item.__raw || item);
    }
  }

  ensureItems() {
    const {items} = this.props;
    return Array.isArray(items) && items.map(function (item) {
      if (item == null || item === '') return null;
      if (typeof item !== 'object') return String(item).trim().length ? {text: item, __raw: item} : null;
      if (!item.text && !item.icon) return null;
      if (!item.icon) return item;
      if (typeof item.icon !== 'string') return null;
      return item;
    });
  }

  ensureNavItem(index, item, attrs) {
    const {textColor, selectedTextColor} = this.props;
    const {selected} = this.state;
    const children = [];

    if (item.icon) {
      children.push(
        <Icon
          className={CLASS_NAME + '__item-icon'}
          name={item.icon}
          size="big"
        />
      );
    }

    if (item.text) {
      children.push(
        <Text
          className={CLASS_NAME + '__item-text'}
          value={item.text}
          lines={1}
        />
      );
    }

    const classes = new TokenList();
    const styles = new StyleMap();
    classes.add(CLASS_NAME + '__item');

    if (index === selected) {
      if (selectedTextColor) {
        styles.set('color', selectedTextColor);
      }

      classes.add('selected');
    } else if (textColor) {
      styles.set('color', textColor);
    }

    attrs.children.push(h(Ripple, {
      className: classes.toString(),
      style: styles.toString(),
      onClick: this.proxyItemClick(index, item),
      children
    }));
  }

  render(props) {
    let items = this.ensureItems();
    items = items && items.filter(Boolean);
    if (!items || !items.length) return null;

    const {backgroundColor} = props;
    const styles = new StyleMap();
    const classList = new TokenList();

    classList.add(CLASS_NAME);
    classList.add(props.type || 'static');

    if (access(backgroundColor)) {
      classList.add(backgroundColor);
    } else if (backgroundColor) {
      styles.set('background-color', backgroundColor);
    }

    const attrs = {
      className: classList.toString(),
      styles: styles.toString(),
      children: []
    };

    items.forEach((item, index) => {
      this.ensureNavItem(index, item, attrs);
    });

    return h('div', attrs);
  }
};
