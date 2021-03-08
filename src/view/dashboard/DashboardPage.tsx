import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { i18n } from 'src/i18n';
import Box from 'src/view/shared/styles/Box';
import { getHistory } from 'src/modules/store';


function DashboardPage(props) {
  const doToOps = () => {
    getHistory().push('/control_line_execution');
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
          <Grid onClick={doToOps} item xs={12} md={12}>
            <Box >
              <div >
                <h2 >Ejecución de línea de control</h2>
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
