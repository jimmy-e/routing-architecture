import routeConstants from '../routeConstants';
import { CurrentFeatureFlags, CurrentUserRoles } from '../types';
import hasFeatureAccess from './hasFeatureAccess';
import hasRoleAccess from './hasRoleAccess';

// Determines if a child navigation menu item is accessible to a user based on their user roles
// or any feature flags.
// 1. We lookup the route in the `routes.ts` file, and see if that route requires any feature
// flags to be enabled. If it does, than we compare the current enabled feature flags in our
// application with the feature flags that are required by the route. If the required feature
// flag is enabled, than the child menu item / route can be accessed based on additional
// criteria. If the feature flag is turned off, then the menu item / route cannot be accessed no
// matter what.
// 2. We look up the route in the `routes.ts` file and find out what required roles are allowed
// to access said route, and determine if the current user has the correct role access.
export default (
  childMenuItemRoute: string,
  currentFeatureFlags: CurrentFeatureFlags,
  currentUserRoles: CurrentUserRoles,
) => {
  // get the corresponding object in the `routes.ts` file for the specific child route.
  const childMenuItemObject = routeConstants.byId[childMenuItemRoute];

  // determine if the menu item is gated / blocked by feature flag requirements.
  const hasFeatureAccessForChild = hasFeatureAccess(
    currentFeatureFlags, childMenuItemObject.enabledFeatureFlag,
  );

  // if there is no feature flag gating for the route, or the feature flag is enabled, determine
  // if the user has correct role access. ...
  if (hasFeatureAccessForChild) {
    return hasRoleAccess(
      currentUserRoles,
      childMenuItemObject.requiredRoles,
      childMenuItemObject.meAccess,
    );
  }
  // ... If the feature flag is enabled but is turned off in the application, then return false.
  return false;
};
