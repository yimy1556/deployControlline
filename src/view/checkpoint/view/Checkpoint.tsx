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
import checkpointViewSelectors from 'src/modules/config/checkpoint/view/checkpointViewSelectors';
import selectorsCheckpoint from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import selectorFaults from 'src/modules/config/fault/list/faultListSelectors';
import actionsFaults from 'src/modules/config/fault/list/faultListActions';
import actionsCheckpoint from 'src/modules/config/checkpoint/list/checkpointListActions';

const schema = yup.object().shape({
  nameCheckpoint: yupFormSchemas.string(i18n('user.fields.firstName'), {
    required: true,
  }),
  description: yupFormSchemas.string(i18n('process.fields.description'), {
    required: true,
  }),
  controlTypeId: yupFormSchemas.integer(i18n('checkpoint.fields.controlType'), {
    required: true,
  }),
  categoryId: yupFormSchemas.integer('Categoria', {
    required: true,
  }),
  faults: yupFormSchemas.stringArray(i18n('checkpoint.fields.failure'),{
    required: true,
  }),
  operators: yupFormSchemas.stringArray('Opérarios', {
    required: true,
  })
});

const addName = (value) => ({
  ...value,
  name: value.nameCheckpoint,
})

function Checkpoint() {
  const valuesInitial = useSelector(checkpointViewSelectors.selectEdition)
  const [initialValues] = useState({
    id: valuesInitial?.id || null,
    nameCheckpoint: valuesInitial?.name || null,
    description: valuesInitial?.description || null,
    userId: valuesInitial?.user?.id || null,
    controlTypeId: valuesInitial?.controlType?.id || null,
    categoryId: valuesInitial?.category?.id || null,
    status: valuesInitial?.status || null,
    faults: valuesInitial?.checkpointDetails?.reduce((acc, el) => ([...acc, el.fault.id]), []) || [],
    operators: valuesInitial?.operators?.reduce((acc, el) => ([...acc, el.fault.id]), []) || [],
  });
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionsFaults.doFetch({}))
  }, [dispatch]);

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues
  });


  const closeModal = () => {
    dispatch(actions.closeModal());
  }

  const optionCategory = useSelector(selectorsCheckpoint.selectOptionCategory);
  const optionControlType = useSelector(selectorsCheckpoint.selectOptionControlType);
  const defindFaults = useSelector(selectorFaults.selectOptionFaultActive);
  const [faults, setFaults] = useState(valuesInitial? valuesInitial?.category?.id: null);
  const optionOperary = useSelector(selectorsCheckpoint.selectOptionOperary);

  const onSubmit = (values) => {
    if(!valuesInitial?.id){
      dispatch(actionsCheckpoint.doCreate({
        ...initialValues,
        ...addName(values),
      }));
    }
    else{
      dispatch(actionsCheckpoint.doEdit({
        ...initialValues,
        ...addName(values),
      }));
    }
  }
  
  const aux = () => {
    return defindFaults.filter(fault => fault.categoryId === faults)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid container direction='column' alignItems='center'>
          <Grid item xs={12}>
            <h1>{!valuesInitial?
              i18n('checkpoint.title')
              : 'Edicion De Puesto de control'}
            </h1>
          </Grid>
          <Grid item container justify='center' xs={11} spacing={2}>
            <Grid item xs={6}>
              <InputFormItem
                name='nameCheckpoint'
                label={i18n('user.fields.firstName')}
              />
          </Grid>
          <Grid item xs={6}>
            <SelectFormItem
              name='controlTypeId'
              options={optionControlType}
              label={i18n('checkpoint.fields.controlType')}
              mode='unico'
            />
          </Grid>
          <Grid item xs={12}>
            <SelectFormItem
              name='categoryId'
              options={optionCategory}
              label='Categoria'
              func= {setFaults}
              disabled= {Boolean(valuesInitial)}  
              mode='unico'
            />
          </Grid>
          <Grid item xs={12}>
            <SelectFormItem
              name='faults'
              options={aux()}
              label={i18n('checkpoint.fields.failure')}
              mode='multiple'
            />
          </Grid>
          <Grid item xs={12}>
            <SelectFormItem
              name='operators'
              options={optionOperary}
              label={'Operario'}
              mode='multiple'
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
            style={{ marginBottom: '10px' }}
            container
            item
            spacing={2}
            xs={8}>
            <Grid item xs={6}>
            <Button
              style={{ marginTop: '8px' }}
              variant="contained"
              color="primary"
              onClick={() => closeModal()}
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
  );
}

export default Checkpoint;
