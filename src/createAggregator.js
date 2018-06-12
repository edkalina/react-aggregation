import React from 'react';
import AggrRenderer from './fiber';
import AggregationContext from './AggregationContext';

// Wrap with identity component to have better look in devtools
function Aggregation({ children }) {
  return children;
}

export default function createAggregator(id, typed = false) {
  return class Aggregator extends React.Component {
    state = {
      items: [],
    };

    componentDidMount() {
      const root = {
        id,
        items: [],
        update: typed
          ? () => this.setState({ items: root.items })
          : () => this.setState({ items: root.items.map(item => item.data) }),
      };

      this._node = AggrRenderer.createContainer(root);
      AggrRenderer.updateContainer(this.getAggregatableTree(), this._node, this);
    }

    componentDidUpdate() {
      AggrRenderer.updateContainer(this.getAggregatableTree(), this._node, this);
    }

    componentWillUnmount() {
      AggrRenderer.updateContainer(null, this._node, this);
    }

    getAggregatableTree() {
      const tree = <AggregationContext.Provider value={true} children={this.props.from} />;
      return process.env.NODE_ENV !== 'production' ? <Aggregation>{tree}</Aggregation> : tree;
    }

    render() {
      return this.props.children(this.state.items);
    }
  };
}
