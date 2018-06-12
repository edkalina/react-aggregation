import React from 'react';

import Holder from './Holder';
import createAggregator from './createAggregator';
import AggregationContext from './AggregationContext';

export default function createAggregatable() {
  const id = {};
  const Aggregator = createAggregator(id, false);

  function Aggregatable(props) {
    return <Holder data={props} id={id} />;
  }

  Aggregatable.Aggregator = Aggregator;

  return Aggregatable;
}

createAggregatable.withFallback = fallback => {
  const id = {};
  const Aggregator = createAggregator(id, false);

  function Aggregatable(props) {
    return (
      <AggregationContext.Consumer>
        {inAggregation => (inAggregation ? <Holder data={props} id={id} /> : fallback(props))}
      </AggregationContext.Consumer>
    );
  }

  Aggregatable.Aggregator = Aggregator;

  return Aggregatable;
};
