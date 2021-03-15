import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { i18n } from 'src/i18n';

const RowTableSmall = ({ value }) => {
  return(
    <TableRow>
      <TableCell align='left'>Nombre : {value.name}</TableCell>
      <TableCell align='left'>Tipo de Falla : {value.typeFalla.name}</TableCell>
    </TableRow>
  )
};


export default function TableSmall({ values }){

  return(
    <>
      <Table size="small" aria-label="purchases">
        <TableBody>
          {values.map((value,index) => (
            <RowTableSmall
              key={index}
              value={value.fault}
            />
         ))}
        </TableBody>
      </Table>
    </>
  )
};
