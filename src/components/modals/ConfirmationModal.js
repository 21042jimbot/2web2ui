import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, Modal } from 'src/components/matchbox';
import styles from './ConfirmationModal.module.scss';
import { Loading } from 'src/components/loading/Loading';

export default class ConfirmationModal extends Component {
  static propTypes = {
    confirming: PropTypes.bool,
    open: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.node,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    confirmVerb: PropTypes.string,
    cancelVerb: PropTypes.string,
  };

  renderContent() {
    const {
      children = null,
      confirming,
      content = children,
      onConfirm,
      onCancel,
      confirmVerb = 'Confirm',
      cancelVerb = 'Cancel',
    } = this.props;

    return (
      <div>
        {content}
        <Button
          className={styles.Confirm}
          disabled={confirming}
          name="confirmation-modal-confirm-button"
          onClick={onConfirm}
          primary
        >
          {confirmVerb}
        </Button>
        <Button onClick={onCancel} className={styles.Cancel}>
          {cancelVerb}
        </Button>
      </div>
    );
  }

  render() {
    const { open, title, isPending, onCancel } = this.props;

    return (
      <Modal open={open} onClose={onCancel}>
        <Panel title={title} sectioned>
          {isPending ? (
            <div className={styles.Loading}>
              <Loading />
            </div>
          ) : (
            this.renderContent()
          )}
        </Panel>
      </Modal>
    );
  }
}
