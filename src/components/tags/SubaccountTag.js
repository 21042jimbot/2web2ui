import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from '@sparkpost/matchbox';
import { InsertLink } from '@sparkpost/matchbox-icons';

const SubaccountTag = ({ id, name, all, receiveAll, master, isDefault }) => {
  let content = null;
  let color = null;
  let defaultContent = null;

  if (id) {
    content = name ? `${name} (${id})` : `Subaccount ${id}`;
  }

  if (isDefault) {
    defaultContent = ' (Default)';
    color = 'orange';
  }

  if (all) {
    content = 'Shared with all';
  }

  if (receiveAll) {
    content = 'All';
  }

  if (master) {
    content = 'Master Account';
  }

  if (!content && !defaultContent) {
    return null;
  }

  return <Tag color={color}><InsertLink size={15} /> {content}{defaultContent}</Tag>;
};

SubaccountTag.propTypes = {
  // 'Subaccount ${id}'
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 'Shared with all'
  all: PropTypes.bool,

  // 'Master account'
  master: PropTypes.bool,

  // 'All'
  receiveAll: PropTypes.bool,

  // Makes the tag orange and appends '(Default)'
  isDefault: PropTypes.bool
};

SubaccountTag.defaultProps = {
  id: null,
  all: false,
  master: false,
  isDefault: false,
  receiveAll: false
};

export default SubaccountTag;
