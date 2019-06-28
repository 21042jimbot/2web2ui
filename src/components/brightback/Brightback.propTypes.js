import PropTypes from 'prop-types';

export default {
  condition: PropTypes.bool.isRequired,
  urls: PropTypes.shape({
    save_return_url: PropTypes.string.isRequired,
    cancel_confirmation_url: PropTypes.string.isRequired
  }),
  render: PropTypes.func.isRequired
};
