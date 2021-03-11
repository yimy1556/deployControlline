import { Grid } from '@material-ui/core';
import { i18n } from 'src/i18n';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import actions from 'src/modules/modal/modalActions';
import selector from 'src/modules/config/fault/view/faultViewSelectors';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
  margin: 0px;
`;

const Descripcion = styled.div`
  p {
    margin: 0px;
    text-align: center;
    min-height: 50px;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 10px;
    padding: 5px;
    border: 1px solid #8A2432;
  }

  h2 {
    text-align: center;
    margin: 0px;
 } 

`

const Valor = styled.p`
  margin: 10px;
  font-size: 20px;
  text-align: center;
`
const functionValor = (key, value) => (
  <Valor>
    <b>{key} : </b>
    {value}
  </Valor>
);

const FaultView = () => {
  const dispatch = useDispatch();

  const closeModel = () => dispatch(actions.closeModal());
  const faultView = useSelector(selector.selectEdition);

  return(
    <>
      <Title>{`Informacion de ${faultView.name}`}</Title>
      <Grid container justify='center'>
        <Grid item sm={6}>
          {functionValor('Nombre', faultView.name)}
        </Grid>
        <Grid item sm={6}>
          {functionValor('Categoria', faultView.category.name)}
        </Grid>
        <Grid item sm={12}>
          {functionValor('Tipo de falla', faultView.typeFalla.name)}
        </Grid>
        <Grid item sm={12}>
          <Descripcion>
            <h2>Descripcion</h2>
            <p>{faultView.description}</p>
          </Descripcion>
        </Grid>
        <Grid item sm={9}>
          <Button
            style={{ marginTop: '8px' }}
            variant="contained"
            color="primary"
            fullWidth
            onClick={closeModel}
          >
            {i18n("Cerrar")}
          </Button>
        </Grid>
      </Grid>
    </>
  );

}
export default FaultView;
