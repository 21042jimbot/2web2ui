import sparkpostApiRequest from 'src/actions/helpers/sparkpostApiRequest';

export function list() {
  return sparkpostApiRequest({
    type: 'LIST_INVOICES',
    meta: {
      method: 'GET',
      url: '/v1/billing/invoices',
    },
  });
}

export function get(id) {
  return sparkpostApiRequest({
    type: 'GET_INVOICE',
    meta: {
      method: 'GET',
      url: `/v1/billing/invoices/${id}`,
      responseType: 'blob',
      invoiceId: id,
    },
  });
}
