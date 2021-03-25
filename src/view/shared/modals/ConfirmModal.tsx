import React from 'react';
import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';

function ConfirmModal(props) {
  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={props.onClose}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>{props.title}</DialogTitle>
      {props.content &&
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
      }
      <DialogActions>
        <Button
          onClick={props.onClose}
          color="primary"
          size="small"
        >
          {props.cancelText}
        </Button>
        <Button
          onClick={props.onConfirm}
          color="primary"
          size="small"
          autoFocus
        >
          {props.okText}
        </Button>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ConfirmModal;
