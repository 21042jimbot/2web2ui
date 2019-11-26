import { createSelector } from 'reselect';
import endsWith from 'lodash/endsWith';
import { PLACEMENT_FILTER_TYPES } from '../pages/inboxPlacement/constants/types';
import { fillByDate } from 'src/helpers/date';
import moment from 'moment';

export const getSeeds = (state) => state.inboxPlacement.seeds;
export const getTrends = (state) => state.inboxPlacement.trends;
const getFilters = (state,props) => props.match.params;
const getInboxPlacementByMailbox = (state) => state.inboxPlacement.placementsByProvider;
const getInboxPlacementByRegion = (state) => state.inboxPlacement.placementsByRegion;

export const selectReferenceSeed = createSelector(
  [getSeeds], (seeds) => seeds.find((seed) => endsWith(seed, '@seed.sparkpost.com')));

const getInboxPlacement = (state) => state.inboxPlacement;

export const selectTestDetailsPageError = createSelector(
  [getInboxPlacement], (inboxPlacement) => inboxPlacement.getTestError || inboxPlacement.getByProviderError || inboxPlacement.getByRegionError || inboxPlacement.getTestContentError
);

export const selectTestDetailsPageLoading = createSelector(
  [getInboxPlacement], (inboxPlacement) => inboxPlacement.getTestPending || inboxPlacement.getByProviderPending || inboxPlacement.getByRegionPending || inboxPlacement.getTestContentPending
);

export const selectSinglePlacementResult = createSelector(
  [getInboxPlacementByMailbox, getInboxPlacementByRegion, getFilters],
  (inboxPlacementByMailbox, inboxPlacementByRegion, { filterType, filterName }) => {
    switch (filterType) {
      case PLACEMENT_FILTER_TYPES.MAILBOX_PROVIDER:
        return inboxPlacementByMailbox.find(({ mailbox_provider }) => mailbox_provider === filterName);
      case PLACEMENT_FILTER_TYPES.REGION:
        return inboxPlacementByRegion.find(({ region }) => region === filterName);
      default:
        return {};
    }
  });

export const selectTrends = createSelector(
  [getTrends],
  (trends) => {
    if (trends.length === 0) {
      return [];
    }

    const normalizedHistory = trends.map(({ date, folders, total_messages }) => ({
      date,
      totalMessages: total_messages,
      inbox: folders.inbox_pct,
      spam: folders.spam_pct,
      missing: folders.missing_pct
    }));

    const filledHistory = fillByDate({
      dataSet: normalizedHistory,
      fill: {
        totalMessages: null,
        inbox: null,
        spam: null,
        missing: null
      },
      //TODO Use dates from date selector/redux store
      from: moment().subtract(30, 'd'),
      to: moment().add(1, 'd')
    });

    return filledHistory;
  }
);
