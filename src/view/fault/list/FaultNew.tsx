import { Grid } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import actions from 'src/modules/modal/modalActions';

const options = [
  {value: 'chocolate', label: 'Chocolate'  },
  { value: 'strawberry', label: 'Strawberry'  },
  { value: 'vanilla', label: 'Vanilla'  }      
]

const schema = yup.object().shape({
  firstName: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
  }),
  description: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
  category: yupFormSchemas.boolean(
    i18n('user.fields.rememberMe'),
  ),
});



function FaultNew() {
  const [initialValues] = useState({
    firstNamer: '',
    description: '',
    category: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues
  });


  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(actions.closeModal());
  }
  const onSubmit = (values) => console.log(values);
 
  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item xs={12}>
        <h1>Configuracion de Falla</h1>
      </Grid>
      <Grid item xs={12}>
        <FormProvider {...form}>
          <Grid item xs={12}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container  direction='column'  alignItems='center'>
                <Grid item container justify='center' xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <InputFormItem
                      name='firstName'
                      label={i18n('user.fields.firstName')}
                    />
                  </Grid>                 
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='category'
                      options={options}
                      label={i18n('checkpoint.fields.controlType')}
                      mode='unico'
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <SelectFormItem
                      name={'typeFalla'}
                      label={'Tipo de Falla'}
                      options={[]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputFormItem
                      name='description'
                      label={i18n('process.fields.description')}
                      multiline
                      rows={6}
                    />
                  </Grid>
                </Grid>
                <Grid
                  style={{ marginBottom: '5px' }}
                  container 
                  item 
                  spacing={2} 
                  xs={8}>
                  <Grid item xs={6}>
                    <Button
                      style={{ marginTop: '8px' }}
                      variant="contained"
                      color="primary"
                      onClick= {() => closeModal()}
                      fullWidth
                    >
                      {i18n('common.cancel')}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      style={{ marginTop: '8px' }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      fullWidth
                      disabled={false}
                    >
                      {i18n('common.save')}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  );
}

export default FaultNew;
