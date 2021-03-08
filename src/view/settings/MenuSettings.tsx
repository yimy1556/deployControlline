import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Box from '../shared/styles/Box';
import { getHistory } from 'src/modules/store';


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
                        <Box onClick={doToControlLine} >
                            <div >
                                <h2>Gestion linea de control</h2>
                            </div>
                        </Box >
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box onClick={doToCheckpoint} >
                            <div >
                                <h2>Gestion puesto de control</h2>
                            </div>
                        </Box >
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box onClick={doToFaults}>
                            <div >
                                <h2>Gestion fallas</h2>
                            </div>
                        </Box >
                    </Grid>

                </Grid>
            </div>
        </>
    );
}

export default MenuSettings;
