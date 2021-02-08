import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { i18n } from 'src/i18n';


const useStyles = makeStyles((theme) => ({
  
}));

function DashboardPage(props) {
  const classes = useStyles();

  return (
    <>
      <div
        style={{
          padding: 0,
        }}
      >
        <Grid spacing={2} container>
        </Grid>
      </div>
    </>
  );
}

export default DashboardPage;
