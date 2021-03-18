import { lazy } from 'react';

const AdminPage = lazy(() => import('pages/admin/adminPage/adminPage'));
const EmailPage = lazy(() => import('pages/email/emailPage/emailPage'));
const PropertyPage = lazy(() => import('pages/property/propertyPage/propertyPage'));

export default (route) => {
  switch (route) {
    case 'admin':
      return AdminPage;
    case 'emails':
      return EmailPage;
    case 'property':
    case 'property/:propertyId':
      return PropertyPage;
    default:
      throw Error;
  }
};
