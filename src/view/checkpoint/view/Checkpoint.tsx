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

const options = [
  {value: 1, label: 'Chocolate'  },
  { value: 2, label: 'Strawberry'  },
  { value: 3, label: 'Vanilla'  },
  {value: 4, label: 'Chocolate'  },
  { value: 5, label: 'Strawberry'  },
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
  verificationType: yupFormSchemas.integer(i18n('checkpoint.fields.typeOfVerification'), {
    required: true,
  }),
  faults: yupFormSchemas.stringArray(i18n('chechpoint.fields.failure'),{
    required: true,
  }),
  operators: yupFormSchemas.stringArray('Opérarios', {
    required: true,
  }),
  category: yupFormSchemas.integer('Categoria', {
    required: true,
  }),
});

function Checkpoint() {
  const valuesInitial = useSelector(checkpointViewSelectors.selectEdition)
  console.log(valuesInitial,'sdssdsddsds')

  const [initialValues] = useState({
    name: valuesInitial?.name || '',
    description: valuesInitial?.description || '',
    userId: valuesInitial?.user?.id || 2,
    controlTypeId: valuesInitial?.controlType?.id || 2,
    category: valuesInitial?.category?.id || 0,
    verificationType: valuesInitial?.verificationType || '',
    status: valuesInitial?.status || 'active',
    faults: valuesInitial?.faults || [],
    operators: valuesInitial?.operators || [],
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
  const optionVerificationtype = useSelector(selectorsCheckpoint.selectOptionVerificationType);
  const optionControlType = useSelector(selectorsCheckpoint.selectOptionControlType);  
  const onSubmit = (values) => console.log(values);
 
  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item xs={12}>
        <h1>{i18n('checkpoint.title')}</h1>
      </Grid>
      <Grid item xs={12}>
        <FormProvider {...form}>
          <Grid item xs={12}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container  direction='column'  alignItems='center'>
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
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='verificationType'
                      options={optionVerificationtype}
                      label={i18n('checkpoint.fields.typeOfVerification')}
                      mode='unico'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='category'
                      options={optionCategory}
                      label='Categoria'
                      mode='unico'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SelectFormItem 
                      name='faults'
                      options={options}
                      label={i18n('checkpoint.fields.failure')}
                      mode='multiple'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SelectFormItem 
                      name='operators'
                      options={options}
                      label={'Opérarios'}
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
                  style={{marginBottom:'10px'}}
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

export default Checkpoint;
