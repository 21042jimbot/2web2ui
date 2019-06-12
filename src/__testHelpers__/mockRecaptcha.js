import React from 'react';

class MockRecaptcha extends React.Component {
  reset = () => true;

  componentDidMount() {
    if (this.props.onloadCallback) {
      this.props.onloadCallback();
    }
  }

  execute = () => {
    if (this.props.verifyCallback) {
      this.props.verifyCallback('test-recaptcha-response');
    }
  };

  render = () => true;
}

export default MockRecaptcha;
