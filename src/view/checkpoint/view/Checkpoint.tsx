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


const options = [
  { value: 3, label: 'Opeario 1' },
  { value: 2, label: 'Operario 2' },
  { value: 3, label: 'Operario 3' },
  { value: 4, label: 'Operario 4' },
  { value: 5, label: 'Operario 5' },
]

const schema = yup.object().shape({

});

function Checkpoint() {
  const valuesInitial = useSelector(checkpointViewSelectors.selectEdition)

  const [initialValues] = useState({
    name: valuesInitial?.name || '',
    description: valuesInitial?.description || '',
    userId: valuesInitial?.user?.id || 2,
    controlTypeId: valuesInitial?.controlType?.id || 2,
    categoryId: valuesInitial?.category?.id || 0,
    verificationType: valuesInitial?.verificationType || '',
    status: valuesInitial?.status || 'active',
    faults: valuesInitial?.faults || [],
    operaryId: valuesInitial?.operators || [],
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
  const faults = useSelector(selectorFaults.selectRowsFault);

  console.log(faults)

  const onSubmit = (values) => {

    const rawValues = form.getValues();
    console.log(rawValues)
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
                      options={options}
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
