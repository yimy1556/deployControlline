import React from 'react';
import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import actions from 'src/modules/controlLineExecution/list/controlLineExecutionListActions';
import {i18n} from 'src/i18n';


const schema = yup.object().shape({
  description: yupFormSchemas.string(i18n('process.fields.description'), {
    required: true,
  }),
});

function ModalStatus(props) {
  const dispatch = useDispatch(); 
  console.log(props)
  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });


  const onSubmit = (values) => {
    console.log(values)
    dispatch(actions.editStatus(props.content))
    props.onClose()
  }

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={props.onClose}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <InputFormItem
                name='description'
                label={i18n('process.fields.description')}
                multiline
                rows={6}
              />
              <DialogActions>
                <Button
                  onClick={props.onClose}
                  color="primary"
                  size="small"
                >
                  {props.cancelText}
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  size="small"
                  autoFocus
                >
                  {props.okText}
                </Button>
                </DialogActions>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ModalStatus;
