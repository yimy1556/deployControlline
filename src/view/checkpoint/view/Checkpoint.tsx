import { Grid, makeStyles } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import AddIcon from '@material-ui/icons/Add';
import { i18n } from 'src/i18n';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import {
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Box,
  Button,
} from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const options = [
  {value: 'chocolate', label: 'Chocolate'  },
  { value: 'strawberry', label: 'Strawberry'  },
  { value: 'vanilla', label: 'Vanilla'  }      
]

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
  }),
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
  rememberMe: yupFormSchemas.boolean(
    i18n('user.fields.rememberMe'),
  ),
});



function Checkpoint() {
  var listPost = [];
  const [initialValues] = useState({
    email: '',
    password: '',
    rememberMe: true
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues
  });

  const onSubmit = (values) => console.log(values);
 
  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item xs={6}>
        <h2>{i18n('checkpoint.title')}</h2>
      </Grid>
      <Grid item xs={12}>
        <FormProvider {...form}>
          <Grid item xs={12}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container  direction='column'  alignItems='center' xs={12} xl={12}>
                <Grid item container justify='center' xs={10} spacing={3}>
                  <Grid item xs={6}>
                    <InputFormItem
                      name='nombre'
                      label={i18n('user.fields.firstName')}
                      autoFocus
                    />
                  </Grid>                 
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='tipoDeControl'
                      options={options}
                      label={i18n('checkpoint.fields.controlType')}
                      mode='unico'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='tipoDeVerificacion'
                      options={options}
                      label={i18n('checkpoint.fields.typeOfVerification')}
                      mode='unico'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='fallas'
                      options={options}
                      label={i18n('checkpoint.fields.failure')}
                      mode='multiple'
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <InputFormItem
                      name='descripcion'
                      label={i18n('process.fields.description')}
                      multiline
                      rows={6}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={8}>
                  <Button
                    style={{ marginTop: '8px' }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={false}
                  >
                    {i18n('common.continue')}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  );
}

export default Checkpoint;
