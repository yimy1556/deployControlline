import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Fab,
} from '@material-ui/core';
import { Link  } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import UndoIcon from '@material-ui/icons/Undo';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import actions from 'src/modules/config/process/list/processListActions';
import selectors from 'src/modules/user/list/userListSelectors';
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
import checkpointListActions from 'src/modules/config/checkpoint/list/checkpointListActions';

const schema = yup.object().shape({
  name: yupFilterSchemas.string(i18n('user.fields.firstName')),
  Plant: yupFilterSchemas.string(i18n('process.fields.plant')),
  sku: yupFilterSchemas.string(i18n('process.fields.sku')),
  numberOfCheckpoints: yupFilterSchemas.integer('nuesto'),
});

const previewRenders = {
  name: {
    label: i18n('user.fields.fullName'),
    render: filterRenders.generic(),
  },
  plant: {
    label: i18n('process.fields.plant'),
    render: filterRenders.generic(),
  },
  sku: {
    label: i18n('process.fields.sku'),
    render: filterRenders.generic(),
  },
};

const emptyValues = {
  name: null,
  plant: null,
  sku: null,
};

function ProcessFilter(props) {
  const rawFilter = useSelector(selectors.selectRawFilter);
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  

  const { loading } = props;
    
  const [initialValues] = useState(() => {
    return {
      ...emptyValues,
      ...rawFilter,
    };
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  useEffect(() => {
    dispatch(actions.doFetch(schema.cast(initialValues), rawFilter));
    // eslint-disable-next-line
    dispatch(checkpointListActions.doLoadOption());
  }, [dispatch]);

  const onSubmit = (values) => {
    const rawValues = form.getValues();
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
                  <InputFormItem
                    name={'sku'}
                    label={i18n('process.fields.sku')}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <SelectFormItem
                    name={'plant'}
                    label={i18n('process.fields.plant')}
                    options={[]}
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
                    component={Link}
                    to={`/process/new-process`}
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

export default ProcessFilter;
