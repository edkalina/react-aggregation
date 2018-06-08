import React from 'react';

import Holder from './Holder';
import createAggregator from './createAggregator';
import AggregationContext from './AggregationContext';

export default function createAggregatable() {
  const id = {};
  const Aggregator = createAggregator(id);
  const Aggregatable = props => <Holder data={props} id={id} />;

  Aggregatable.Aggregator = Aggregator;

  Aggregatable.withFallback = fallback => {
    function AggregatableWithFallback(props) {
      return (
        <AggregationContext.Consumer>
          {inAggregation => (inAggregation ? <Holder data={props} id={id} /> : fallback(props))}
        </AggregationContext.Consumer>
      );
    }

    AggregatableWithFallback.Aggregator = Aggregator;

    return AggregatableWithFallback;
  };

  return Aggregatable;
}
