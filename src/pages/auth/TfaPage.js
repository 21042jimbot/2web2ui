import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'src/components/matchbox';
import { CenteredLogo } from 'src/components';
import TfaForm from './components/TfaForm';
import RedirectBeforeLogin from './components/RedirectBeforeLogin';
import RedirectAfterLogin from './components/RedirectAfterLogin';
import { AUTH_ROUTE } from 'src/constants';

export const TfaPage = ({ loggedIn, tfaEnabled }) => {
  if (loggedIn) {
    return <RedirectAfterLogin />;
  }

  if (!tfaEnabled) {
    return <RedirectBeforeLogin to={AUTH_ROUTE} />;
  }

  return (
    <React.Fragment>
      <CenteredLogo />
      <Panel sectioned title="Two-factor Authentication">
        <TfaForm />
      </Panel>
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth, tfa }) => ({
  loggedIn: auth.loggedIn,
  tfaEnabled: tfa.enabled,
});

export default connect(mapStateToProps)(TfaPage);
