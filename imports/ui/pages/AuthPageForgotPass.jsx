import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import i18n from 'meteor/universe:i18n';
import BaseComponent from '../components/BaseComponent.jsx';

import AuthPage from './AuthPage.jsx';

export default class ForgotPassPage extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = Object.assign(this.state, { errors: {} });
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.email.value;
    const errors = {};

    if (!email) {
      errors.email = i18n.__('pages.authPageForgotPass.emailRequired');
    }

    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }
	var me = this;
	Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
		  me.setState ({errors: {'email': 'This email does not exist.'}});
          } else {
          me.setState ({errors: {'email': 'We are sorry but something went wrong.'}});
          }
        } else {
          me.setState ({errors: {'email': 'Email Sent. Check your mailbox.'}});
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
          {i18n.__('pages.authPageForgotPass.forgotpass')}
        </h1>
        <p className="subtitle-auth">
          {i18n.__('pages.authPageForgotPass.forgotpassReason')}
        </p>
        <form onSubmit={this.onSubmit}>
          <div className="list-errors">
            {errorMessages.map(msg => (
              <div className="list-item" key={msg}>{msg}</div>
            ))}
          </div>
          <div className={`input-symbol ${errorClass('email')}`}>
            <input
              type="email"
              name="email"
              ref={(c) => { this.email = c; }}
              placeholder={i18n.__('pages.authPageForgotPass.yourEmail')}
            />
            <span
              className="icon-email"
              title={i18n.__('pages.authPageForgotPass.yourEmail')}
            />
          </div>
          <button type="submit" className="btn-primary">
            {i18n.__('pages.authPageForgotPass.forgotpassButton')}
          </button>
        </form>
      </div>
    );

    const link = (
      <Link to="/join" className="link-auth-alt">
        {i18n.__('pages.authPageSignIn.needAccount')}
      </Link>
    );

    return <AuthPage content={content} link={link} />;
  }
}

ForgotPassPage.contextTypes = {
  router: React.PropTypes.object,
};
