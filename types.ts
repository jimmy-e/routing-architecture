// ----- TYPES ----- //

// array of strings that indicate what feature flags are currently turned on, as returned from
// the backend.
export type CurrentFeatureFlags = string[];

// the id for the current logged in user.
export type CurrentUserId = number;

// the array of roles currently assigned to the user.
export type CurrentUserRoles = string[];

// array of strings that indicate if that string / feature flag is turned on, then the page /
// route should be enabled / accessible.
export type EnabledFeatureFlag = string;

// What user roles are allowed to access this route. If empty, any user is allowed to
// access this route.
export type RequiredRoles = string[];

// the individual route for the application that needs to be accessed.
export type Route = string;

// ----- INTERFACES ----- //

// declarative schema for individual routes to be invoked in our application.
export interface Routes {
  allIds: Route[];
  byId: {
    [key: string]: {
      enabledFeatureFlag?: EnabledFeatureFlag;
      requiredRoles: RequiredRoles;
    };
  };
}
