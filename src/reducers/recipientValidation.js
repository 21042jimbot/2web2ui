export const initialState = {
  singleResults: null,
  uploadLoading: false,
  jobResultsLoading: false,
  singleLoading: false,
  jobResults: {},
  latest: null,
  listError: null,
  jobLoadingStatus: {
    // id: 'init'
  },
  jobsLoadingStatus: 'init'
};

const recipientValidationReducer = (state = initialState, { meta, payload, type }) => {
  switch (type) {
    case 'GET_JOB_LIST_PENDING':
      return { ...state, jobsLoadingStatus: 'pending' };

    case 'GET_JOB_LIST_FAIL':
      return { ...state, jobsLoadingStatus: 'fail' };

    case 'GET_JOB_LIST_SUCCESS':
      return {
        ...state,
        jobsLoadingStatus: 'success',
        jobResults: payload.reduce((acc, job) => ({ ...acc, [job.list_id]: job }), state.jobResults)
      };

    case 'GET_JOB_STATUS_PENDING':
    case 'TRIGGER_JOB_PENDING':
      return {
        ...state,
        jobResultsLoading: true, // todo, remove with latest
        jobLoadingStatus: { ...state.jobLoadingStatus, [meta.context.id]: 'pending' }
      };

    case 'GET_JOB_STATUS_FAIL':
    case 'TRIGGER_JOB_FAIL':
      return {
        ...state,
        jobResultsLoading: false, // todo, remove with latest
        jobLoadingStatus: { ...state.jobLoadingStatus, [meta.context.id]: 'fail' }
      };

    case 'GET_JOB_STATUS_SUCCESS':
    case 'TRIGGER_JOB_SUCCESS':
      return {
        ...state,
        jobLoadingStatus: { ...state.jobLoadingStatus, [meta.context.id]: 'success' },
        jobResultsLoading: false, // todo, remove with latest
        jobResults: { ...state.jobResults, [payload.list_id]: payload }
      };


    case 'GET_LATEST_JOB_PENDING':
      return { ...state, jobResultsLoading: true };
    case 'GET_LATEST_JOB_FAIL':
      return { ...state, jobResultsLoading: false };
    case 'GET_LATEST_JOB_SUCCESS':
      return {
        ...state,
        jobResultsLoading: false,
        jobResults: { ...state.jobResults, [payload.list_id]: payload },
        latest: payload.list_id
      };

    // List Upload
    case 'UPLOAD_RECIPIENT_VALIDATION_LIST_PENDING':
      return { ...state, uploadLoading: true };

    case 'UPLOAD_RECIPIENT_VALIDATION_LIST_SUCCESS':
      return {
        ...state,
        uploadLoading: false,
        latest: payload.list_id
      };

    case 'UPLOAD_RECIPIENT_VALIDATION_LIST_FAIL':
      return { ...state, uploadLoading: false, listError: payload };

    case 'RESET_RECIPIENT_VALIDATION_FAIL':
      return { ...state, listError: null };

    // Single Recipient
    case 'SINGLE_RECIPIENT_VALIDATION_PENDING':
      return { ...state, singleResults: null, singleLoading: true };

    case 'SINGLE_RECIPIENT_VALIDATION_SUCCESS':
      return {
        ...state,
        singleResults: {
          ...payload,
          email: meta.email
        },
        singleLoading: false
      };

    case 'SINGLE_RECIPIENT_VALIDATION_FAIL':
      return { ...state, singleResults: null, singleLoading: false };
  }

  return state;
};

export default recipientValidationReducer;
