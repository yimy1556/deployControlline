import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { i18n } from 'src/i18n';
import Box from 'src/view/shared/styles/Box';
import { getHistory } from 'src/modules/store';

const useStyles = makeStyles((theme) => ({

}));

function DashboardPage(props) {
  const classes = useStyles();
  const doToUser = () => {
    getHistory().push('/user');
  };
  const doToProcess = () => {
    getHistory().push('/process');
  };
  const doToOps = () => {
    getHistory().push('/ops');
  };
  const doToSettings = () => {
    getHistory().push('/settings');
  };
  return (
    <>
      <div
        style={{
          padding: 0,
        }}
      >
        <Grid spacing={1} container>
          <Grid onClick={doToUser} item xs={12} md={12}>
            <Box >
              <div >
                <h2 >Usuarios</h2>
              </div>
            </Box >
          </Grid>
          <Grid onClick={doToProcess} item xs={12} md={12}>
            <Box >
              <div >
                <h2 >Procesos</h2>
              </div>
            </Box >
          </Grid>
          <Grid onClick={doToOps} item xs={12} md={12}>
            <Box >
              <div >
                <h2 >Ops</h2>
              </div>
            </Box >
          </Grid>
          <Grid onClick={doToSettings} item xs={12} md={12}>
            <Box >
              <div >
                <h2>Configuraciones</h2>
              </div>
            </Box >
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default DashboardPage;
