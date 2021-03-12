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
import View from 'src/view/process/orde/VistCheckpoint';
import Modal from 'src/view/shared/modals/Modal';
import processListActions from 'src/modules/config/process/list/processListActions';
import { Link } from 'react-router-dom';
import selectProcess from 'src/modules/config/process/list/processListSelectors';
import { getHistory  } from 'src/modules/store';
import viewActiond from 'src/modules/config/process/view/processViewActions';

const schema = yup.object().shape({ 
  nameControlLine: yupFormSchemas.string(i18n('user.fields.firstName'), {
    required: true,
  }),
  industrialPlantId: yupFormSchemas.integer(i18n('process.fields.plant'), {
    required: true,
  }),
  sku: yupFormSchemas.string(i18n('process.fields.sku'), {
    required: true,
  }),
  description:  yupFormSchemas.string(i18n('process.fields.description'), {
    required: true,
  }),
  categoryId : yupFormSchemas.integer('Categoria', {
    required:  true,
  })
});

const addValue = (value, checkpoints) => ({
  ...value,
  name: value.nameControlLine,
  checkpoints: checkpoints.reduce((acc, el) => [...acc, el.id],[]),
})

function ProcessDischarge(props) { 
  const dispatch = useDispatch();
  const valueInitial = useSelector(processViewSelectors.selectEdition);  
  const isEdit = useSelector(processViewSelectors.selectIsEdit);
  const optionCategory = useSelector(selectorsCheckpoint.selectOptionCategory);
  const optionCheckpoint = useSelector(selectProcess.selectOptionCheckpoint);
  const optionIndustrialPlant = useSelector(selectProcess.selectOptionIndustrialPlants);


  const [initialValues] = useState({
    id: isEdit?  valueInitial?.id: null,
    sku: isEdit? valueInitial?.sku: null,
    status: isEdit? valueInitial?.status: null,
    nameControlLine: isEdit? valueInitial?.name: null,
    userId: 2,
    industrialPlantId: valueInitial?.industrialPlant.id || null,
    description: valueInitial?.description || null,
    categoryId: valueInitial?.category?.id || null,
  });
  
  useEffect(() => {
    dispatch(processListActions.doLoadOption());
  }, [dispatch]);

  

  const editCheckpoints = valueInitial?.checkpoints?.reduce((acc, el) => 
    ([...acc,
      {
        id:el.checkpoint.id,
        label: el.checkpoint.name
      }
    ]),[]);
  
  const [category, setCategory] = useState(valueInitial? initialValues.categoryId:null);
  const [checkpoints, setCheckpoints] = useState( editCheckpoints || [] );
  
  const resetCategory = (category) => {
    setCheckpoints([]);
    setCategory(category);
  }

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues
  });

  const configCheckpoint = () => {
    dispatch(actions.modalOpen());
  }

  const onSubmit = async(values) => {
    const newValue = await addValue(values, checkpoints);
    if(!isEdit){
      dispatch(processFormActions.doAdd({
        ...initialValues,
        ...newValue,
      }));
    }
    else{
      dispatch(processListActions.doEdit({
        ...initialValues,
        ...newValue,
      }));
    }
  }
  


  const optionCheckpoints = (doCheckpoints) => {

    const options = optionCheckpoint.reduce((acc, el) => ([...acc, 
      { 
        ...el,
        id: el.value,
      }]),[])
    .filter(option => option.categoryId === category); 
    
    return  options.filter(option => 
      (!doCheckpoints.find(check => 
        (check.id === option.id)
      )));
  }
  
  return (
    <Grid container alignItems='stretch' justify='center' direction='column'>
      <Grid item xs={12}>
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container item  direction='column'  alignItems='center' xs={12} xl={12}>
                <Grid item container justify='center' xs={10} spacing={3}>
                  <Grid item xs={6}>
                    <InputFormItem
                      name='nameControlLine'
                      label={i18n('user.fields.firstName')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputFormItem
                      name='sku'
                      label={i18n('process.fields.sku')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='industrialPlantId'
                      options={optionIndustrialPlant}
                      label={i18n('process.fields.plant')}
                      mode='unico'
                    />
                  </Grid>       
                  <Grid item xs={6}>
                    <SelectFormItem 
                      name='categoryId'
                      options={optionCategory}
                      label='Categoria'
                      mode='unico'
                      func={resetCategory}
                      disabled={initialValues.industrialPlantId}
                      />
                  </Grid>
                  <Modal full sm={'sm'}>
                    <h2 style={{textAlign:'center'}}>Asignación de Puestos de Control</h2>
                    <Grid item xs={12}>
                      <SelectFormItem 
                        name='checkpoints'
                        options={optionCheckpoints(checkpoints)}
                        label={i18n('process.fields.checkpoint')}
                        mode='multiple'
                        notSeve={checkpoints}
                        func={setCheckpoints}
                      />
                    </Grid>
                    <View items={checkpoints} setItems={setCheckpoints} />
                      <Grid item xs={6}>
                      <Button
                        style={{ 
                          marginTop: '8px',
                          marginLeft: '50%',
                        }}
                        variant="contained"
                        color="primary"
                        onClick= {() => dispatch(actions.closeModalCheckpoint())}
                        fullWidth
                      >
                        {i18n('Cerrar')}
                      </Button>
                    </Grid>
                  </Modal>
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
                  style={{marginTop: '10px',}}
                  container 
                  item 
                  spacing={2} xs={8}>
                  <Grid item xs={4}>
                    <Button
                      style={{ marginTop: '8px' }}
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => dispatch(viewActiond.finishEdicion())}
                      component={Link}
                      to='/control_line'
                    >
                      {i18n('common.cancel')}
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      style={{ marginTop: '8px' }}
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={false}
                      onClick={configCheckpoint}
                    >
                      {i18n('Asignar puestos de control')}
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
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
