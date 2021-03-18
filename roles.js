export default {
  allIds: [
    'admin',
    'marketing',
    'risk-manager',
  ],
  byId: {
    admin: {
      description: 'can edit data in the admin section.',
      defaultPage: {
        priority: 3,
        route: 'admin',
      },
    },
    marketing: {
      description: 'can communicate with prospects.',
      defaultPage: {
        priority: 1,
        route: 'marketing/dashboard',
      },
    },
    'risk-manager': {
      description: 'manages client risk',
      defaultPage: {
        route: 'property/dashboard',
      },
    },
  },
  noRole: {
    defaultPage: 'streams/',
  },
};
