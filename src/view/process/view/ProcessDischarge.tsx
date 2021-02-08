import { Grid } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'src/modules/modal/modalActions';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  nombre: yupFormSchemas.string(i18n('user.fields.firstName'), {
    required: true,
  }),
  planta: yupFormSchemas.string(i18n('process.fields.plant'), {
    required: true,
  }),
  sku: yupFormSchemas.string(i18n('process.fields.sku'), {
    required: true,
  }),
  descripcion:  yupFormSchemas.string(i18n('process.fields.description'), {
    required: true,
  }),
  cantidadPuestos:  yupFormSchemas.integer('puestos', {
    required: true,
  })
});


const options = [
  {value: 'chocolate', label: 'Chocolate'  },
  { value: 'strawberry', label: 'Strawberry'  },
  { value: 'vanilla', label: 'Vanilla'  }      
]


function ProcessDischarge() {
  const [initialValues] = useState({
    nombre: '',
    planta: '',
    sku: '',
    descripcion: '',
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
    <Grid container alignItems='stretch' justify='center' direction='column'>
      <Grid container justify='center' item xs={12}>
        <h1>{i18n('process.title')}</h1>
      </Grid>
      <Grid item xs={12}>
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container item  direction='column'  alignItems='center' xs={12} xl={12}>
                <Grid item container justify='center' xs={10} spacing={3}>
                  <Grid item xs={6}>
                    <InputFormItem
                      name='nombre'
                      label={i18n('user.fields.firstName')}
                    />
                  </Grid>                 
                  <Grid item xs={6}>
                    <InputFormItem
                      name='cantidadPuestos'
                      label={i18n('process.fields.numberOfCheckpoint')}
                      type='number'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='planta'
                      options={options}
                      label={i18n('process.fields.plant')}
                      mode='unico'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='sku'
                      options={options}
                      label={i18n('process.fields.sku')}
                      mode={i18n('process.fields.sku')}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <SelectFormItem 
                      name='puestos'
                      options={options}
                      label={i18n('process.fields.checkpoint')}
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
                <Grid container item spacing={2} xs={8}>
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
        </FormProvider>
      </Grid>
    </Grid>
  );
}

export default ProcessDischarge;
