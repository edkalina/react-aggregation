import { createContext } from 'react';

const AggregationContext = createContext(false);

AggregationContext.Provider.displayName = 'AggregationContextProvider';
AggregationContext.Consumer.displayName = 'AggregationContextConsumer';

export default AggregationContext;
