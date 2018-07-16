import {Component} from 'preact';

function parseSlots(children) {
  const slots = {};

  function add(name, child) {
    (slots[name] || (slots[name] = [])).push(child);
  }

  children.forEach(function (child) {
    if (child == null) return;
    const attrs = child.attributes;
    add(attrs && attrs.slot || 'default', child);
  });

  return slots;
}


export default class Container extends Component {
  render(props) {
    const slots = parseSlots(props.children);

    console.log(slots);

    return (
      <div>
        {Object.keys(slots).map(function (key) {
          return <div className="key">
            <h2>{key}</h2>
            {slots[key]}
          </div>
        })}
      </div>
    );
  }
}
