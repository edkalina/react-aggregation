# React Aggregation

Alternative impementation of React Call Return.

**This library is expiremental!!! DO NOT use it in production!!!**

## Installation

```
npm install -S react-aggregation
```

or

```
yarn add react-aggregation
```

## Examples

* **Select**: [Source](https://github.com/gokalina/react-aggregation/tree/master/examples/select) | [Sandbox](https://codesandbox.io/s/8zj74v27j2)
* **React Router Switch**: [Source](https://github.com/gokalina/react-aggregation/tree/master/examples/react-router-switch) | [Sandbox](https://codesandbox.io/s/6y7lmlvlrw)

## Code snippets

Component usage:

```javascript
const Two = () => <Option value="two">Two</Option>;

const SelectDemo = () => (
  <Select initialValue="one">
    <Option value="one">
      <b>One</b>
    </Option>
    <Two />
  </Select>
);
```

Component development:

```javascript
import createAggregatable from 'react-aggregation';

const Option = createAggregatable();

class Select extends React.Component {
  render() {
    const { children } = this.props;
    const { isOpen, value } = this.state;

    return (
      <div onClick={this.onToggle}>
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
              <div>{getLabel(options, value)}</div>
            )
          }
        </Option.Aggregator>
      </div>
    );
  }
}

export { Select, Option };
```
