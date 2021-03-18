import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CurrentFeatureFlags, CurrentUserId, CurrentUserRoles } from './types';
import LazyLoadingSpinner from 'spinners/lazyLoadingSpinner/lazyLoadingSpinner';
import DefaultPage from './defaultPage';
import getRoutes from './getRoutes';

interface Props {
  currentFeatureFlags: CurrentFeatureFlags;
  currentUserId: CurrentUserId;
  currentUserRoles: CurrentUserRoles;
}

const Routes: React.FC<Props> = ({ currentFeatureFlags, currentUserId, currentUserRoles }) => (
  <React.Suspense fallback={LazyLoadingSpinner}>
    <Switch>
      <Route
        exact
        render={() => (
          <DefaultPage
            currentUserId={currentUserId}
            currentUserRoles={currentUserRoles}
          />
        )}
      />
      {getRoutes(currentFeatureFlags, currentUserId, currentUserRoles)}
      <Redirect to="/crm/not-found" />
    </Switch>
  </React.Suspense>
);

export default Routes;
