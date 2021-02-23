import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Fab,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UndoIcon from '@material-ui/icons/Undo';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import actions from 'src/modules/config/checkpoint/list/checkpointListActions';
import selectors from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import userEnumerators from 'src/modules/user/userEnumerators';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import FilterWrapper, {
  FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import actionsModal from 'src/modules/modal/modalActions';
import actionsFault from 'src/modules/config/fault/list/faultListActions';

const schema = yup.object().shape({
  name: yupFilterSchemas.string(i18n('user.fields.firstName')),
  controlType: yupFilterSchemas.string(i18n('checkpoint.fields.controlType')),
  typeOfVerification: yupFilterSchemas.string(i18n('checkpoint.typeOfVerification')),
});


const previewRenders = {
  name: {
    label: 'Nombre',
    render: filterRenders.generic(),
  },
  controlType: {
    label: 'Tipo de control',
    render: filterRenders.generic(),
  },
  category: {
    label: 'Categoria',
    render: filterRenders.generic(),
  },
};

const emptyValues = {
  name: null,
  verificationType: null,
  controlType: null,
  category: null,
};

function UserFilter(props) {
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);

  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const openModel = () => {
    dispatch(actionsModal.modalOpen());
  };

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(actions.doFetch(schema.cast(initialValues), rawFilter));
    // eslint-disable-next-line
    dispatch(actions.doLoadOption());
    dispatch(actionsFault.doLoadOption());
  }, [dispatch]);

  const optionCategory = useSelector(selectors.selectOptionCategory);
  const optionVerificationtype = useSelector(selectors.selectOptionVerificationType);
  const optionControlType = useSelector(selectors.selectOptionControlType)
  console.log(optionCategory)
  const onSubmit = (values) => {
    const rawValues = form.getValues();
    console.log(rawValues)
    dispatch(actions.doFetch(values, rawValues));
    setExpanded(false);
  };

  const onReset = () => {
    Object.keys(emptyValues).forEach((key) => {
      form.setValue(key, emptyValues[key]);
    });
    dispatch(actions.doReset());
    setExpanded(false);
  };

  const { loading } = props;

  return (
    <FilterWrapper>
      <FilterAccordion
        expanded={expanded}
        onChange={(event, isExpanded) =>
          setExpanded(isExpanded)
        }
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <FilterPreview
            values={rawFilter}
            renders={previewRenders}
            expanded={expanded}
          />
        </AccordionSummary>
        <AccordionDetails>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item lg={6} xs={12}>
                  <InputFormItem
                    name={'name'}
                    label={i18n('user.fields.firstName')}
                  />
                </Grid>

                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name={'controlType'}
                    label={i18n('checkpoint.fields.controlType')}
                    options={optionControlType.reduce((acc, el) => ([...acc, { value: el.label, label: el.label   }]),[])}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name='category'
                    label='Categoria'
                    options={optionCategory.reduce((acc, el) => ([...acc, { value: el.label, label: el.label   }]),[])}
                  />
                </Grid>
              </Grid>
              <FilterButtons>
                <Tooltip
                  title={i18n('process.newControlLine')}
                >
                  <Fab
                    size="small"
                    color="primary"
                    onClick={openModel}
                  >
                    <AddIcon />
                  </Fab>
                </Tooltip>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  startIcon={<SearchIcon />}
                  size="small"
                >
                  {i18n('common.search')}
                </Button>
                <Button
                  type="button"
                  onClick={onReset}
                  disabled={loading}
                  startIcon={<UndoIcon />}
                  size="small"
                >
                  {i18n('common.reset')}
                </Button>
              </FilterButtons>
            </form>
          </FormProvider>
        </AccordionDetails>
      </FilterAccordion>
    </FilterWrapper>
  );
}

export default UserFilter;
