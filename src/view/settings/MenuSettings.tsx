import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Box from '../shared/styles/Box';


const useStyles = makeStyles((theme) => ({

}));

function MenuSettings(props) {
    const classes = useStyles();

    return (
        <>
            <div
                style={{
                    padding: 0,
                }}
            >
                <Grid spacing={1} container>
                    <Grid item xs={12} md={12}>
                        <Box >
                            <div >
                                <h2>Gestion linea de control</h2>
                            </div>
                        </Box >
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box >
                            <div >
                                <h2>Gestion puesto de control</h2>
                            </div>
                        </Box >
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Box >
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
