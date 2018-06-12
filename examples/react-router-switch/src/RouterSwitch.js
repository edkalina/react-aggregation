import React from 'react';
import { Route as OriginalRoute, Redirect as OriginalRedirect, matchPath } from 'react-router';
import PropTypes from 'prop-types';
import createAggregation from 'react-aggregation';

const { Aggregator, createAggregatable} = createAggregation();

export const Route = createAggregatable.withFallback(props => <OriginalRoute {...props} />);
export const Redirect = createAggregatable.withFallback(props => <OriginalRedirect {...props} />);

if (process.env.NODE_ENV !== 'production') {
  Aggregator.displayName = 'RouteAggregator'
  Route.displayName = 'Route';
  Redirect.displayName = 'Redirect';
  OriginalRoute.displayName = 'OriginalRoute';
  OriginalRedirect.displayName = 'OriginalRedirect';
}

export class Switch extends React.Component {
  static contextTypes = {
    router: PropTypes.shape({
      route: PropTypes.object.isRequired,
    }).isRequired,
  };

  render() {
    const { children } = this.props;

    return (
      <Aggregator from={children}>
        {routes => {
          const currentRoute = this.context.router.route;
          const location = this.props.location || currentRoute.location;

          let match = undefined;
          let redirect = false;
          const route = routes.find(({ type, data }) => {
            redirect = type === Redirect;
            const { exact, strict, sensitive } = data;
            const path = redirect ? data.from : data.path;

            match = path
              ? matchPath(location.pathname, { path, exact, strict, sensitive })
              : currentRoute.match;

            return !!match;
          });

          if (!match) {
            return null;
          }

          return redirect ? (
            <OriginalRedirect {...route.data} />
          ) : (
            <OriginalRoute {...route.data} location={location} computedMatch={match} />
          );
        }}
      </Aggregator>
    );
  }
}
