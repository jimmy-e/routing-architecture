import { Routes } from './types';

// Provides metadata about all routes used the app. Each id identifies an app route.
const routeConstants: Routes = {
  allIds: [
    'admin',
    'emails',
    'property',
    'property/:propertyId',
  ],
  byId: {
    admin: {
      interpretedRoute: 'admin',
      requiredRoles: ['admin'],
    },
    emails: {
      enabledFeatureFlag: 'email_automation',
      requiredRoles: ['marketing'],
    },
    property: {
      requiredRoles: [],
    },
    'property/:propertyId': {
      requiredRoles: ['risk-manager'],
    },
  },
};

export default routeConstants;
