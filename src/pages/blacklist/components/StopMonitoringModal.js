import React from 'react';
import { Modal } from '@sparkpost/matchbox';
import { Button, Panel } from 'src/components/matchbox';
import { connect } from 'react-redux';
import { domainRegex } from 'src/helpers/regex';
import { Loading } from 'src/components';
import styles from './StopMonitoringModal.module.scss';
import { deleteMonitor } from 'src/actions/blacklist';
import { showAlert } from 'src/actions/globalAlert';

export const StopMonitoringModal = ({
  closeModal,
  deleteMonitor,
  isPending,
  monitorToDelete,
  showAlert,
}) => {
  const confirmAction = () => {
    deleteMonitor(monitorToDelete).then(() => {
      showAlert({
        type: 'success',
        message: `Stopped Monitoring ${monitorToDelete}.`,
      });
      closeModal();
    });
  };
  const renderContent = () => {
    if (!monitorToDelete) {
      return null;
    }
    return (
      <>
        <p>
          {`Removing this ${
            monitorToDelete.match(domainRegex) ? 'domain' : 'IP'
          } from your watchlist means you won't get notified of changes, but don't
          worry you can always add it again later.`}
        </p>
        <Button className={styles.Confirm} disabled={isPending} onClick={confirmAction} primary>
          Stop Monitoring
        </Button>
      </>
    );
  };

  const title = monitorToDelete ? `Stop Monitoring ${monitorToDelete}` : '';

  return (
    <Modal open={Boolean(monitorToDelete)} onClose={closeModal} showCloseButton={true}>
      <Panel title={title} accent sectioned>
        {isPending ? (
          <div className={styles.Loading}>
            <Loading />
          </div>
        ) : (
          renderContent()
        )}
      </Panel>
    </Modal>
  );
};

const mapStateToProps = state => ({
  isPending: state.blacklist.deleteMonitorPending || state.blacklist.monitorsPending,
});
export default connect(mapStateToProps, { deleteMonitor, showAlert })(StopMonitoringModal);
