import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Box from '../shared/styles/Box';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

function MenuSettings(props) {
    const doToControlLine = () => {
        getHistory().push('/control_line');
    };
    const doToFaults = () => {
        getHistory().push('/faults');
    };
    const doToCheckpoint = () => {
        getHistory().push('/checkpoint');
    };
    return (
        <>
            <div
                style={{
                    padding: 0,
                }}
            >
                <Grid spacing={1} container>
                    <Grid item xs={12} md={12}>
                        <Box onClick={doToFaults}>
                            <div >
                                <h2>{i18n('faults.title')}</h2>
                            </div>
                        </Box >
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box onClick={doToCheckpoint} >
                            <div >
                                <h2>{i18n('checkpoint.title')}</h2>
                            </div>
                        </Box >
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box onClick={doToControlLine} >
                            <div >
                                <h2>{i18n('controlLine.title')}</h2>
                            </div>
                        </Box >
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default MenuSettings;
