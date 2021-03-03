import React, { useEffect, useState } from 'react';
import { i18n } from '../../../i18n';
import {
    AccordionDetails,
    AccordionSummary,
    Button,
    Grid,
    Fab,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UndoIcon from '@material-ui/icons/Undo';
import AddIcon from '@material-ui/icons/Add';
import selectors from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import { useDispatch, useSelector } from 'react-redux';
import FilterWrapper, {
    FilterButtons,
} from 'src/view/shared/styles/FilterWrapper';
import FilterAccordion from 'src/view/shared/filter/FilterAccordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterPreview from 'src/view/shared/filter/FilterPreview';
import filterRenders from 'src/modules/shared/filter/filterRenders';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { FormProvider, useForm } from 'react-hook-form';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import yupFilterSchemas from 'src/modules/shared/yup/yupFilterSchemas';
import actionsModal from 'src/modules/modal/modalActions';
import Tooltip from '@material-ui/core/Tooltip';
import actions from 'src/modules/config/checkpoint/list/checkpointListActions';

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
}
function OpsFilter(props) {
    const rawFilter = useSelector(selectors.selectRawFilter);
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.doFetch(schema.cast(initialValues), rawFilter));
        dispatch(actions.doLoadOption());
    }, [dispatch]);
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
    const onReset = () => {
        Object.keys(emptyValues).forEach((key) => {
            form.setValue(key, emptyValues[key]);
        });
        dispatch(actions.doReset());
        setExpanded(false);
    };

    const { loading } = props;
    const onSubmit = (values) => {
        const rawValues = form.getValues();
        dispatch(actions.doFetch(values, rawValues));
        setExpanded(false);
    }
    return (
        <>
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
                                            name={'id'}
                                            label={'Id'}
                                        />
                                    </Grid>

                                    <Grid item lg={6} xs={12}>
                                        <InputFormItem
                                            name={'usuario'}
                                            label={'Usuario'}
                                        />
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <SelectFormItem
                                            name='process'
                                            label='Linea de control'
                                            options={[]}
                                        />
                                    </Grid>
                                    <Grid item lg={6} xs={12}>
                                        <SelectFormItem
                                            name='date'
                                            label='Fecha'
                                            options={[]}
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
                                        Limpiar Filtros
                </Button>
                                </FilterButtons>
                            </form>
                        </FormProvider>
                    </AccordionDetails>
                </FilterAccordion>
            </FilterWrapper>
        </>
    );
}

export default OpsFilter;
