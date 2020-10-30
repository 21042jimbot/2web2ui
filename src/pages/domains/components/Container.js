import React from 'react';
import { connect } from 'react-redux';
import {
  get as getDomain,
  list as listSendingDomains,
  update as updateSendingDomain,
  create as createSendingDomain,
  remove as deleteDomain,
  verifyDkim,
  verify,
  verifyMailbox,
  verifyAbuse,
  verifyPostmaster,
} from 'src/actions/sendingDomains';
import { list as listSubaccounts } from 'src/actions/subaccounts';
import { showAlert } from 'src/actions/globalAlert';
import {
  createTrackingDomain,
  listTrackingDomains,
  updateTrackingDomain,
  deleteTrackingDomain,
  verifyTrackingDomain,
} from 'src/actions/trackingDomains';
import { selectSendingDomainsRows, selectBounceDomainsRows } from 'src/selectors/sendingDomains';
import {
  selectTrackingDomainsRows,
  selectTrackingDomainsOptions,
} from 'src/selectors/trackingDomains';
import { selectTrackingDomainCname } from 'src/selectors/account';
import { hasSubaccounts } from 'src/selectors/subaccounts';
import { DomainsProvider } from '../context/DomainsContext';
import { selectCondition } from 'src/selectors/accessConditionState';
import { hasAccountOptionEnabled } from 'src/helpers/conditions/account';
import { selectHasAnyoneAtDomainVerificationEnabled } from 'src/selectors/account';
import {
  selectAllowDefaultBounceDomains,
  selectAllSubaccountDefaultBounceDomains,
} from 'src/selectors/account';

function mapStateToProps(state) {
  return {
    sendingDomains: selectSendingDomainsRows(state),
    sendingDomainsListError: state.sendingDomains.listError,
    bounceDomains: selectBounceDomainsRows(state),
    listPending:
      state.sendingDomains.listLoading ||
      state.trackingDomains.listLoading ||
      state.subaccounts.listLoading,
    createPending: state.sendingDomains.createLoading || state.trackingDomains.createLoading,
    deletePending: state.trackingDomains.deleting || state.sendingDomains.deleting,
    updateTrackingPending: state.trackingDomains.updating,
    hasSubaccounts: hasSubaccounts(state),
    subaccounts: state.subaccounts.list,
    trackingDomains: selectTrackingDomainsRows(state),
    trackingDomainOptions: selectTrackingDomainsOptions(state),
    trackingDomainsListError: state.trackingDomains.error,
    userName: state.currentUser.username,
    isByoipAccount: selectCondition(hasAccountOptionEnabled('byoip_customer'))(state),
    hasAnyoneAtEnabled: selectHasAnyoneAtDomainVerificationEnabled(state),
    allowDefault: selectAllowDefaultBounceDomains(state),
    allowSubaccountDefault: selectAllSubaccountDefaultBounceDomains(state),
    verifyDkimLoading: state.sendingDomains.verifyDkimLoading,
    verifyEmailLoading: state.sendingDomains.verifyEmailLoading,
    verifyBounceLoading: state.sendingDomains.verifyBounceLoading,
    verifyingTrackingPending: state.trackingDomains.verifyingTrackingPending,
    trackingDomainCname: selectTrackingDomainCname(state),
  };
}

const mapDispatchToProps = {
  createSendingDomain,
  createTrackingDomain,
  getDomain,
  listSendingDomains,
  updateSendingDomain,
  listSubaccounts,
  listTrackingDomains,
  verify,
  verifyDkim,
  verifyMailbox,
  verifyAbuse,
  verifyPostmaster,
  showAlert,
  deleteDomain,
  updateTrackingDomain,
  deleteTrackingDomain,
  verifyTrackingDomain,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ children, ...props }) => {
  return <DomainsProvider value={props}>{children}</DomainsProvider>;
});
