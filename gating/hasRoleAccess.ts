import { CurrentUserRoles, RequiredRoles } from '../types';

// determines if a user is allowed access to a route based on their roles.
// * if a route does not declare any roles required to access it, then the route should be
//   accessible / return true.
// * if a route does have roles that are required to access it, does the current user have such
//   a role that is required?
export default (
  currentUserRoles: CurrentUserRoles,
  requiredRoles: RequiredRoles,
  meAccess?: boolean,
): boolean => {
  if (requiredRoles.length === 0) {
    return true;
  }
  if (meAccess) {
    // Only show 'My Activity' if they have the advisor role
    if (requiredRoles.includes('manager') && currentUserRoles.includes('advisor')) {
      return true;
    }
    return false;
  }
  return requiredRoles.some(requiredRole => currentUserRoles.includes(requiredRole));
};
