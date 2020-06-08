import React from 'react';
import { useHibana } from 'src/context/HibanaContext';
import { omitSystemProps } from 'src/helpers/hibana';
import { Modal as MBModal } from '@sparkpost/matchbox';
import { Modal as HibanaModal } from '@sparkpost/matchbox-hibana';
import Portal from './Portal';
import styles from './Modal.module.scss';

HibanaModal.displayName = 'HibanaModal';

export const OGModal = ({ children, ...rest }) => (
  <Portal containerId="modal-portal">
    <MBModal className={styles.Modal} {...rest}>
      {children}
    </MBModal>
  </Portal>
);
export default function Modal(props) {
  const [{ isHibanaEnabled }] = useHibana();
  if (!isHibanaEnabled) {
    return <OGModal {...omitSystemProps(props)} />;
  }
  return <HibanaModal {...props} />;
}
