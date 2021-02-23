import { Grid, makeStyles } from '@material-ui/core';
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
  name: yupFormSchemas.string(i18n('user.fields.firstName'), {
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
  faults: yupFormSchemas.stringArray(i18n('chechpoint.fields.failure'),{
    required: true,
  }),
  operaryId: yupFormSchemas.integer('Opérarios', {
    required: true,
  })
});

function Checkpoint() {
  const valuesInitial = useSelector(checkpointViewSelectors.selectEdition)

  const [initialValues] = useState({
    name: valuesInitial?.name || null,
    description: valuesInitial?.description || null,
    userId: valuesInitial?.user?.id || null,
    controlTypeId: valuesInitial?.controlType?.id || null,
    categoryId: valuesInitial?.category?.id || null,
    status: valuesInitial?.status || null,
    faults: valuesInitial?.checkpointDetails?.reduce((acc, el) => ([...acc, el.fault.id]), []) || [],
    operaryId: valuesInitial?.user?.id  || null,
  });
  
console.log(initialValues, 'edicion')

  console.log(valuesInitial, initialValues);
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
  const faults = useSelector(selectorFaults.selectRowsFault);
  const optionOperary = useSelector(selectorsCheckpoint.selectOptionOperary);

  console.log(faults)

  const onSubmit = (values) => {
    console.log(values)
    dispatch(actionsCheckpoint.doCreate(values))
  };

  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item xs={12}>
        <h1>{i18n('checkpoint.title')}</h1>
      </Grid>
      <Grid item xs={12}>
        <FormProvider {...form}>
          <Grid item xs={12}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container direction='column' alignItems='center'>
                <Grid item container justify='center' xs={11} spacing={2}>
                  <Grid item xs={6}>
                    <InputFormItem
                      name='name'
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
                      mode='unico'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SelectFormItem
                      name='faults'
                      options={faults.reduce((acc, el) => ([...acc, { value: el.id, label: el.name }]), [])}
                      label={i18n('checkpoint.fields.failure')}
                      mode='multiple'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SelectFormItem
                      name='operaryId'
                      options={optionOperary}
                      label={'Operarios'}
                      mode='unico'
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
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  );
}

export default Checkpoint;
