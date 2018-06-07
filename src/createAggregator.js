import React from 'react';
import AggrRenderer from './fiber';
import AggregationContext from './AggregationContext';

export default function createAggregator(id) {
  return class Aggregator extends React.Component {
    state = {
      items: [],
    };

    componentDidMount() {
      const root = {
        id,
        items: [],
        update: () => {
          this.setState({ items: root.items.map(item => item.data) });
        },
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
      return <AggregationContext.Provider value={true} children={this.props.from} />;
    }
    render() {
      return this.props.children(this.state.items);
    }
  };
}
