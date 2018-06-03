import React from 'react';
import AggregatableInner from './AggregatableInner';
import createAggregator from './createAggregator';

export default function createAggregatable() {
  const id = {};
  const Aggregatable = props => <AggregatableInner data={props} id={id} />;

  Aggregatable.Aggregator = createAggregator(id);

  return Aggregatable;
}
