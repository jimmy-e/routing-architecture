import { CurrentFeatureFlags, EnabledFeatureFlag } from '../types';

// determines if a user should have access to a route based on feature flags.
// * if a route does not declare that any feature flags are necessary to access it, then the
//   route should be accessible / return true.
// * if a route does require a certain feature flag, then is that feature flag turned on in the
//   backend?
export default (
  currentFeatureFlags: CurrentFeatureFlags, enabledFeatureFlag: EnabledFeatureFlag,
): boolean => {
  if (enabledFeatureFlag) {
    return currentFeatureFlags.includes(enabledFeatureFlag);
  }
  return true;
};
