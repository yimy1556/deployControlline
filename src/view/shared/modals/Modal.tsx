import React from 'react';
import ReactDOM from 'react-dom';
import { Dialog, DialogContent } from '@material-ui/core';
import modalSelectors from 'src/modules/modal/modalSelectors';
import { useSelector } from 'react-redux';

function Modal(props) {
  
  const {children,full,sm, onClose} = props;
  
  const open = useSelector(
    modalSelectors.selectModalOpen,
  );
  
  return ReactDOM.createPortal(
    <Dialog
      open={open}
      onClose={onClose || undefined}
      fullWidth={true}
      maxWidth= {sm || 'md'}
    >
      <DialogContent  
      >
        {children}
      </DialogContent>      
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default Modal;
