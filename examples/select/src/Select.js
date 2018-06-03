import React from 'react';
import createAggregatable from 'react-aggregation';
import OptionRenderer from './OptionRenderer';

const Option = createAggregatable();

function getLabel(items, value) {
  const item = items.find(item => item.value === value);

  return item ? item.children : '----';
}

class Select extends React.Component {
  state = {
    isOpen: false,
    value: this.props.initialValue,
  };

  onToggle = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  onSelect = value => {
    this.setState({ value });
  };

  render() {
    const { children } = this.props;
    const { isOpen, value } = this.state;

    return (
      <div
        style={{
          display: 'inline-block',
          border: '1px solid',
          padding: '10px',
        }}
        onClick={this.onToggle}
      >
        <Option.Aggregator from={children}>
          {options =>
            isOpen ? (
              <div>
                {options.map(option => (
                  <OptionRenderer
                    key={option.value}
                    {...option}
                    onSelect={this.onSelect}
                    isSelected={option.value === value}
                  />
                ))}
              </div>
            ) : (
              <div style={{ cursor: 'pointer' }}>{getLabel(options, value)}</div>
            )
          }
        </Option.Aggregator>
      </div>
    );
  }
}

export { Select, Option };
