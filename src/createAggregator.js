import React from 'react';
import AggrRenderer from './fiber';

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
      AggrRenderer.updateContainer(this.props.from, this._node, this);
    }

    componentDidUpdate() {
      AggrRenderer.updateContainer(this.props.from, this._node, this);
    }

    componentWillUnmount() {
      AggrRenderer.updateContainer(null, this._node, this);
    }

    render() {
      return this.props.children(this.state.items);
    }
  };
}
