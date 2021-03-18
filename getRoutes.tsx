import * as React from 'react';
import { Route as ReactRoute } from 'react-router-dom';
import hasFeatureAccess from './gating/hasFeatureAccess';
import hasRoleAccess from './gating/hasRoleAccess';
import {
  CurrentFeatureFlags, CurrentUserId, CurrentUserRoles, EnabledFeatureFlag, RequiredRoles, Route,
} from './types';
import routeConstants from './routeConstants';
import Pages from './pages';


// `getRoute`: returns a route if it should be accessible. Thus, `getRoutes` ultimately is an array
// of routes that a user can access. So if a user should not be allowed to access a route, that
// route (and it's corresponding page component) simply do not exist / are not instantiated on
// the browser. If a user's roles / permissions change, then a hard refresh is required so that
// his code can be re-invoked and new routes can be built.
// -----
// A route should be accessible if:
//   * Above all else, if a route declared in our static 'routes' configuration file
//   (static/routes.ts) has declared a feature flag, then if that feature flag must be turned on
//   for that route to be accessed. If a route has not declared any feature flags, then there is
//   no feature flag gating.
//   * A user's role must have access to the route. A route may declare which roles are allowed
//   to access it. If a user's role meets that criteria, then the route can be accessed. If a
//   route does not have any user role gating, then any user can access that route.
//   * If a route has 'meAccess', this means that a user can access their own individual route /
//   page but not others. For example (hypothetically), 'manager' roles are allowed to access
//   ALL individual advisor pages. John, however, is not a manager, but instead has an 'advisor'
//   role. Thus, John cannot access the the individual advisor pages of Sarah or Beth, but John
//   should be able to access his own individual advisor page. Thus, the advisor page route
//   (e.g. `/advisors/:userId`) has `meAccess`.
export const getRoute = (
  currentFeatureFlags: CurrentFeatureFlags,
  currentUserId: CurrentUserId,
  currentUserRoles: CurrentUserRoles,
  enabledFeatureFlag: EnabledFeatureFlag,
  requiredRoles: RequiredRoles,
  route: Route,
): React.ReactNode => {
  if (hasFeatureAccess(currentFeatureFlags, enabledFeatureFlag)) {
    if (hasRoleAccess(currentUserRoles, requiredRoles)) {
      return (
        <ReactRoute
          component={Pages(route)}
          exact
          key={route}
          path={route}
        />
      );
    }
    return null;
  }
  return null;
};

// return an array of accessible routes based on routing configurations.
const getRoutes = (
  currentFeatureFlags: CurrentFeatureFlags,
  currentUserId: CurrentUserId,
  currentUserRoles: CurrentUserRoles,
): React.ReactNode[] => routeConstants.allIds.map((route) => {
  const { enabledFeatureFlag, requiredRoles } = routeConstants.byId[route];
  return getRoute(
    currentFeatureFlags,
    currentUserId,
    currentUserRoles,
    enabledFeatureFlag,
    requiredRoles,
    route,
  );
});

export default getRoutes;
