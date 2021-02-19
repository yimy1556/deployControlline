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
import processViewSelectors from 'src/modules/config/process/view/processViewSelectors';
import selectorsCheckpoint from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import processFormActions from 'src/modules/config/process/form/processFormActions';

const schema = yup.object().shape({
  name: yupFormSchemas.string(i18n('user.fields.firstName'), {
    required: true,
  }),
  industrialPlant: yupFormSchemas.integer(i18n('process.fields.plant'), {
    required: true,
  }),
  sku: yupFormSchemas.string(i18n('process.fields.sku'), {
    required: true,
  }),
  description:  yupFormSchemas.string(i18n('process.fields.description'), {
    required: true,
  }),
  checkpointNumber:  yupFormSchemas.integer('Puestos', {
    required: true,
  }),
  checkpoints: yupFormSchemas.stringArray('Puestos de control', {
    required: false,
  }),
  category : yupFormSchemas.integer('Categoria', {
    required:  false,
  })
});

const options = [
  {value: {id: 1}, label: 'Chocolate'  },
  { value: {id: 2}, label: 'Strawberry'  },
  { value: {id: 3}, label: 'Vanilla'  },
  {value: 1, label: 'Chocolate'  },
  { value: 2, label: 'Strawberry'  },
  { value: 6, label: 'Vanilla'  },
  {value: 7, label: 'Chocolate'  },
  { value: 8, label: 'Strawberry'  },
  { value: 9, label: 'Vanilla'  },
  {value: 10, label: 'Chocolate'  },
  { value: 11, label: 'Strawberry'  },
  { value: 12, label: 'Vanilla'  },
  {value: 331, label: 'Chocolate'  },
  { value: 22, label: 'Strawberry'  },
  { value: 39, label: 'Vanilla'  } 
]


function ProcessDischarge() {
  const valueInitial = useSelector(processViewSelectors.selectEdition);
  console.log(valueInitial);
  const [initialValues] = useState({
    id:null,
    userId: 2,
    name: valueInitial?.name || '',
    industrialPlant: valueInitial?.industrialPlant || 1,
    sku: valueInitial?.sku || 'default',
    description: valueInitial?.description || '',
    status: valueInitial?.status || 'active',
    checkpointNumber: valueInitial?.checkpointNumber || 1,
    checkpoints:valueInitial?.checkpoints?.reduce((acc, el) => ([...acc, el.checkpoint.id]),[]) || [],
    category: valueInitial?.category?.id || 1,
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

  const optionCategory = useSelector(selectorsCheckpoint.selectOptionCategory);
  const optionCheckpoint = useSelector(selectorsCheckpoint.selectRows)
  const onSubmit = (values) => {
    dispatch(processFormActions.doAdd({...initialValues, ...values}));
  };
 
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
                      name='name'
                      label={i18n('user.fields.firstName')}
                    />
                  </Grid>                 
                  <Grid item xs={6}>
                    <InputFormItem
                      name='checkpointNumber'
                      label={i18n('process.fields.numberOfCheckpoint')}
                      type='number'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='industrialPlant'
                      options={options}
                      label={i18n('process.fields.plant')}
                      mode='unico'
                    />
                  </Grid>       
                  <Grid item xs={6}>
                    <InputFormItem
                      name='sku'
                      label={i18n('process.fields.sku')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SelectFormItem 
                      name='category'
                      options={optionCategory}
                      label='Categoria'
                      mode='unico'
                      />
                      </Grid>
                  <Grid item xs={12}>
                    <SelectFormItem 
                      name='checkpoints'
                      options={optionCheckpoint.reduce((acc, el) => ([...acc, { value: el.id, label: el.name  }]),[])}
                      label={i18n('process.fields.checkpoint')}
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
                  style={{ marginBottom: '5px' }}
                  container 
                  item 
                  spacing={2} xs={8}>
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
