import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import actions from 'src/modules/modal/modalActions';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { i18n } from 'src/i18n';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import selectorsCheckpoint from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import actionsCheckpoint from 'src/modules/config/checkpoint/list/checkpointListActions';


const schema = yup.object().shape({

});
function Ops(props) {
    const optionOperary = useSelector(selectorsCheckpoint.selectOptionOperary);
    const dispatch = useDispatch();
    const [initialValues] = useState();
    const form = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
        defaultValues: initialValues
    });
    const closeModal = () => {
        dispatch(actions.closeModal());
    }
    const onSubmit = (values) => {
        alert('hola')
    }

    return (
        <Grid container alignItems='center' direction='column'>
            <Grid item xs={12}>
                <h1>{i18n('process.title')}</h1>

            </Grid>
            <Grid item xs={12}>
                <FormProvider {...form}>
                    <Grid item xs={12}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <Grid container direction='column' alignItems='center'>
                                <Grid item container justify='center' xs={11} spacing={2}>
                                    <Grid item xs={6}>
                                        <InputFormItem
                                            name='id'
                                            label={i18n('process.fields.id')}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SelectFormItem
                                            name='process'
                                            options={['Heladera', 'Notebook']}
                                            label={i18n('process.fields.controlLine')}
                                            mode='unico'
                                        />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <SelectFormItem
                                            name='operaryId'
                                            options={optionOperary}
                                            label={i18n('process.fields.operary')}
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

export default Ops;
