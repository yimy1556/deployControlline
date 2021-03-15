import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { i18n } from 'src/i18n';

const RowTableSmall = ({ value, index }) => {
  return(
    <TableRow>
      <TableCell align='left'>Orden : {index}</TableCell>
      <TableCell align='left'>Nombre : {value.name}</TableCell>
      <TableCell align='left'>Tipo de control : {value.controlType.name}</TableCell>
      <TableCell align='left'>Cant. Fallas : {value.checkpointDetails.length}</TableCell>
    </TableRow>
  )
};


export default function TableSmallCheckpoint({ values }){

  return(
    <>
      <Table size="small" aria-label="purchases">
        <TableBody>
          {values.map((value,index) => (
            <RowTableSmall
              key={index}
              index={++index}
              value={value.checkpoint}
            />
         ))}
        </TableBody>
      </Table>
    </>
  )
};
