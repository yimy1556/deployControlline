import { Grid } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import { Button } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import actions from 'src/modules/modal/modalActions';
import faultViewSelectors from 'src/modules/config/fault/view/faultViewSelectors';
import selectorsList from 'src/modules/config/fault/list/faultListSelectors';
import selectorsListCheckponint from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import actionsFault from 'src/modules/config/fault/list/faultListActions';

const addName = (value) => ({
  ...value,
  name: value.nameFault,
})

const schema = yup.object().shape({
  nameFault: yupFormSchemas.string('Nombre', {
    required: true,
  }),
  description: yupFormSchemas.string(i18n('process.fields.description'), {
    required: true,
  }),
  categoryId: yupFormSchemas.integer('Categoria', {
    required: true,
  }),
  typeFallaId: yupFormSchemas.integer('Tipo de falla', {
    required: true,
  }),
});


function FaultNew() {
  const valuesInitial = useSelector(faultViewSelectors.selectEdition)

  const [initialValues] = useState({
    status: valuesInitial?.status || null,
    id: valuesInitial?.id || null,
    nameFault: valuesInitial?.name || '',
    description: valuesInitial?.description || '',
    categoryId: valuesInitial?.category?.id || null,
    typeFallaId: valuesInitial?.typeFalla?.id || null,
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues
  });


  const optionCategory = useSelector(selectorsListCheckponint.selectOptionCategory);
  const optionsTypeFalla = useSelector(selectorsList.selectOptionTypeFalla);

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(actions.closeModal());
  }
  const onSubmit = (values) => {
    if (!valuesInitial.id) {
      dispatch(actionsFault.doCreate({
        ...initialValues,
        ...addName(values),
      }));
    }
    else {
      dispatch(actionsFault.doEdit({
        ...initialValues,
        ...addName(values),
      }));
    }
  }

  return (
    <Grid container alignItems='center' direction='column'>
      <Grid item xs={12}>
        <h1> {valuesInitial.id ?
          'Edicion de Falla'
          : 'Configuracion de Falla'}
        </h1>
      </Grid>
      <Grid item xs={12}>
        <FormProvider {...form}>
          <Grid item xs={12}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container direction='column' alignItems='center'>
                <Grid item container justify='center' xs={12} spacing={2}>
                  <Grid item xs={6}>
                    <InputFormItem
                      name='nameFault'
                      label={i18n('user.fields.firstName')}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <SelectFormItem
                      name='categoryId'
                      options={optionCategory}
                      label='Categoria'
                      mode='unico'
                    />
                  </Grid>
                  <Grid item lg={12} xs={12}>
                    <SelectFormItem
                      name={'typeFallaId'}
                      label={'Tipo de Falla'}
                      options={optionsTypeFalla}
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

export default FaultNew;
