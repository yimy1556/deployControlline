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
import selectors from 'src/modules/controlLineExecution/list/controlLineExecutionListSelectors';
import selectorsCheckpoint from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import actionsCheckpoint from 'src/modules/config/checkpoint/list/checkpointListActions';


const schema = yup.object().shape({

});
function Ops(props) {
    const optionCategory = useSelector(selectorsCheckpoint.selectOptionCategory);
    const optionContolLine = useSelector(selectors.selectOptionControlLine);
    const dispatch = useDispatch();
    const [initialValues] = useState();
    
    const [category,setCategory] = useState(null);
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
    const optionContolLineCategory = () => optionContolLine
        .filter(controlLine => controlLine.category === category);

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Grid container justify='center'>
                    <Grid item xs={12}>
                        <h1 style={{textAlign:'center'}}>{i18n('process.title')}</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectFormItem
                            name='categoryId'
                            options={optionCategory}
                            func={setCategory} 
                            label={i18n('Categoria')}
                            mode='unico'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SelectFormItem
                            name='process'
                            options={optionContolLineCategory()}
                            label={i18n('process.fields.controlLine')}
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
    </FormProvider>
    );
}

export default Ops;
