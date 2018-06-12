import React from 'react';

import Holder from './Holder';
import createAggregator from './createAggregator';
import AggregationContext from './AggregationContext';

/* eslint-disable react/display-name */
export default function createAggregation() {
  const id = {};
  const Aggregator = createAggregator(id, true);

  const createAggregatable = () => {
    const Aggregatable = props => <Holder id={id} type={Aggregatable} data={props} />;

    return Aggregatable;
  };

  createAggregatable.withFallback = fallback => {
    const Aggregatable = props => (
      <AggregationContext.Consumer>
        {inAggregation =>
          inAggregation ? <Holder id={id} type={Aggregatable} data={props} /> : fallback(props)
        }
      </AggregationContext.Consumer>
    );

    return Aggregatable;
  };

  return { Aggregator, createAggregatable };
}
