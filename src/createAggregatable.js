import React from 'react';

import AggregatableInner from './AggregatableInner';
import createAggregator from './createAggregator';
import AggregationContext from './AggregationContext';

export default function createAggregatable() {
  const id = {};
  const Aggregatable = props => <AggregatableInner data={props} id={id} />;

  Aggregatable.Aggregator = createAggregator(id);

  Aggregatable.withFallback = fallback =>
    function AggregatableWithFallback(props) {
      return (
        <AggregationContext.Consumer>
          {inAggregation =>
            inAggregation ? <AggregatableInner data={props} id={id} /> : fallback(props)
          }
        </AggregationContext.Consumer>
      );
    };

  return Aggregatable;
}
