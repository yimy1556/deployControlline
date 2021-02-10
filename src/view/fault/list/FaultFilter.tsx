import {
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UndoIcon from '@material-ui/icons/Undo';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import actions from 'src/modules/user/list/userListActions';
import selectors from 'src/modules/user/list/userListSelectors';
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

const schema = yup.object().shape({
  name: yupFilterSchemas.string(i18n('user.fields.firstName')),
  category: yupFilterSchemas.string(i18n('faults.category')),
});

const previewRenders = {
  name: {
    label: i18n('user.fields.fullName'),
    render: filterRenders.generic(),
  },
  category: {
    label: i18n('user.fields.role'),
    render: (value) =>
      value ? i18n(`roles.${value}.label`) : null,
  },
};

const emptyValues = {
  name: null,
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

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: 'all',
  });

  /*useEffect(() => {
    dispatch(actions.doFetch(schema.cast(initialValues), rawFilter));
    // eslint-disable-next-line
  }, [dispatch]);
   */
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
                    name={'category'}
                    label={i18n('faults.fields.category')}
                    options={userEnumerators.roles.map(
                      (value) => ({
                        value,
                        label: i18n(`roles.${value}.label`),
                      }),
                    )}
                  />
                </Grid>
              </Grid>
              <FilterButtons>
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
