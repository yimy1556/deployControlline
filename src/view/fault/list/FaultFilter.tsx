import { Fab, Grid } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import React, { useEffect, useState } from 'react';
import actions from 'src/modules/modal/modalActions';
import { useSelector, useDispatch } from 'react-redux';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';


const schema = yup.object().shape({
  firstName: yupFormSchemas.string(i18n('user.fields.firstName')),
  category: yupFormSchemas.string(i18n('process.fields.plant')),
});

const options = [
  {value: 'chocolate', label: 'Chocolate'  },
  { value: 'strawberry', label: 'Strawberry'  },
  { value: 'vanilla', label: 'Vanilla'  }      
]


function ProcessFilter() {
  const [initialValues] = useState({
    name: '',
    category: '',
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues
  });
  
  const dispatch = useDispatch();

  const openModel = () => {
    dispatch(actions.modalOpen());
  };

  const onSubmit = (values) => console.log(values);
 
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Grid container item  direction='column'  alignItems='center' xs={12} xl={12}>
          <Grid item container justify='center' xs={10} spacing={3}>
            <Grid item xs={6}>
              <InputFormItem
                name='name'
                label={i18n('faults.fields.name')}
              />
            </Grid>                 
            <Grid item xs={6}>
              <SelectFormItem 
                name='category'
                options={options}
                label={i18n('faults.fields.category')}
                mode='unico'
              />
            </Grid>
          </Grid>
          <Grid container item alignItems='center' justify='flex-end' spacing={3} xs={10}>
            <Grid item>
              <Tooltip
                title={i18n('faults.newFaults')}
              >
                <IconButton
                  color="primary"
                  onClick={() => openModel()}
                >
                  <Fab size="small" color="primary">
                    <AddIcon />
                  </Fab>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Button
                style={{ marginTop: '8px' }}
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                {i18n('common.search')}
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ marginTop: '8px' }}
                variant="contained"
                color="primary"
                fullWidth
              >
                {i18n('common.reset')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
}

export default ProcessFilter;
