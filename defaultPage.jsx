import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import roles from './roles';

export const getDefaultPage = (currentUserRoles) => {
  let homePage;
  currentUserRoles.forEach((currentUserRole) => {
    const role = roles.byId[currentUserRole];
    if (!homePage) {
      homePage = role.defaultPage;
    }
    if (homePage && role.defaultPage.priority < homePage.priority) {
      homePage = role.defaultPage;
    }
  });
  return homePage;
};

export const getDefaultRoute = (currentUserId, currentUserRoles) => {
  if (!currentUserRoles.length) {
    return roles.noRole.defaultPage;
  }
  const defaultPage = getDefaultPage(currentUserRoles);
  if (defaultPage.currentUserId) {
    return `${defaultPage.route}${currentUserId}`;
  }
  return defaultPage.route;
};

const DefaultPage = ({ currentUserId, currentUserRoles }) => (
  <Redirect to={`/crm/${getDefaultRoute(currentUserId, currentUserRoles)}`} />
);

DefaultPage.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  currentUserRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DefaultPage;
