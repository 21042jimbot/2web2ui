import React, { Component } from 'react';
import Modal from 'src/components/modals/Modal';
import styles from './TfaModals.module.scss';
import { Grid, Button, Panel, TextField } from 'src/components/matchbox';

export default class DisableTfaModal extends Component {
  state = {
    password: '',
    showErrors: false,
  };

  componentDidUpdate(oldProps) {
    if (!this.props.enabled && this.props.open) {
      this.props.onClose();
    }
    if (oldProps.open && !this.props.open) {
      this.setState({
        password: '',
        showErrors: false,
      });
    }
    if (!oldProps.toggleError && this.props.toggleError) {
      this.setState({
        showErrors: true,
      });
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  render() {
    const { open, onClose, togglePending, toggleError } = this.props;

    return (
      <Modal open={open} onClose={onClose}>
        <Panel title="Disable Two-Factor Authentication" accent>
          <form onSubmit={e => e.preventDefault()}>
            <Panel.Section>
              <p>Enter your SparkPost password to disable two-factor authentication.</p>
              <p>
                If two-factor authentication is required on this account, you will be logged out
                after disabling it. You can re-enable when you next log in.
              </p>
              <Grid>
                <Grid.Column xs={12} md={6}>
                  <TextField
                    id="tfa-disable-password"
                    type="password"
                    error={this.state.showErrors && toggleError ? 'Incorrect password' : ''}
                    placeholder="Enter your password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </Grid.Column>
              </Grid>
            </Panel.Section>
            <Panel.Section>
              <Button
                type="submit"
                primary
                disabled={togglePending}
                onClick={() => this.props.disable(this.state.password)}
              >
                {togglePending ? 'Disabling...' : 'Disable 2FA'}
              </Button>
              <Button disabled={togglePending} onClick={onClose} className={styles.Cancel}>
                Cancel
              </Button>
            </Panel.Section>
          </form>
        </Panel>
      </Modal>
    );
  }
}
