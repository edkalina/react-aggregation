import React from 'react';
import { Route as RouteRenderer, matchPath } from 'react-router';
import PropTypes from 'prop-types';
import createAggregatable from 'react-aggregation';

const Aggregatable = createAggregatable();
const Route = Aggregatable.withFallback(props => <RouteRenderer {...props} />);

if (process.env.NODE_ENV !== 'production') {
  Route.displayName = 'Route';
  RouteRenderer.displayName = 'RouteRenderer';
}

class Switch extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <Route.Aggregator from={children}>
        {routes => {
          const currentRoute = this.context.router.route;
          const location = this.props.location || currentRoute.location;

          let match = undefined;
          const route = routes.find(route => {
            const { path: pathProp, exact, strict, sensitive, from } = route;
            const path = pathProp || from;

            match = path
              ? matchPath(location.pathname, { path, exact, strict, sensitive })
              : currentRoute.match;

            return !!match;
          });

          return match ? <Route {...route} location={location} computedMatch={match} /> : null;
        }}
      </Route.Aggregator>
    );
  }
}

export { Switch, Route };
