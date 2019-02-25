import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteAlert, listAlerts, createAlert } from 'src/actions/alerts';
import { showAlert } from 'src/actions/globalAlert';

function withAlertsList(WrappedComponent) {
  const mapDispatchToProps = { deleteAlert, listAlerts, showAlert, createAlert };

  const mapStateToProps = (state, props) => ({
    alerts: state.alerts.list,
    error: state.alerts.listError,
    loading: state.alerts.listPending,
    deletePending: state.alerts.deletePending
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedComponent));
}

export default withAlertsList;
