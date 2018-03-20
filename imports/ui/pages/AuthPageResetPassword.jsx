import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';

import AuthPage from './AuthPage.jsx';

export default class ResetPassPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { errors: {} });
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const password = this.password.value;
    const errors = {};

    if (!password) {
      errors.password = i18n.__('pages.authPageResetPassword.passwordRequired'); 
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }
	var me = this;
	var test = this.props.params.token;
	Accounts.resetPassword(this.props.params.token, password, function(err) {
        if (err) {
          me.setState ({errors: {'password': 'We are sorry but something went wrong.'}});
        } else {
         me.context.router.push('/');
        }
      });
  }
  render() {
   const { errors } = this.state;
    const errorMessages = Object.keys(errors).map(key => errors[key]);
    const errorClass = key => errors[key] && 'error';
    const content = (
      <div className="wrapper-auth">
        <h1 className="title-auth">
          {i18n.__('pages.authPageResetPassword.forgotpass')}
        </h1>
        <p className="subtitle-auth">
          {i18n.__('pages.authPageResetPassword.forgotpassReason')}
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <div className={`input-symbol ${errorClass('email')}`}>
            <input
              type="password"
              name="password"
              ref={(c) => { this.password = c; }}
              placeholder={i18n.__('pages.authPageResetPassword.yourPassword')}
            />
            <span
              className="icon-email"
              title={i18n.__('pages.authPageResetPassword.yourPassword')}
            />
          </div>
          <button type="submit" className="btn-primary">
            {i18n.__('pages.authPageResetPassword.forgotpassButton')}
          </button>
        </form>
      </div>
    ); 
    return <AuthPage content={content} />;
  }
}

ResetPassPage.contextTypes = {
  router: React.PropTypes.object,
};
