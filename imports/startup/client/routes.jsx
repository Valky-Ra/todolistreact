import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import i18n from 'meteor/universe:i18n';

// route components
import AppContainer from '../../ui/containers/AppContainer.jsx';
import ListPageContainer from '../../ui/containers/ListPageContainer.jsx';
import AuthPageSignIn from '../../ui/pages/AuthPageSignIn.jsx';
import AuthPageJoin from '../../ui/pages/AuthPageJoin.jsx';
import AuthPageForgotPass from '../../ui/pages/AuthPageForgotPass.jsx';
import NotFoundPage from '../../ui/pages/NotFoundPage.jsx';
import AuthPageResetPassword from '../../ui/pages/AuthPageResetPassword.jsx';
i18n.setLocale('en');

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <Route path="lists/:id" component={ListPageContainer} />
      <Route path="signin" component={AuthPageSignIn} />
	  <Route path="forgotpass" component={AuthPageForgotPass} />
	  <Route path="reset-password/:token" component={AuthPageResetPassword} />
      <Route path="join" component={AuthPageJoin} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);
