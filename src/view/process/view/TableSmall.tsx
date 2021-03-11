import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Box } from '@material-ui/core';
import { i18n } from 'src/i18n';
import UserStatusView from 'src/view/user/view/UserStatusView';

const RowTableSmall = ({ value }) => {
  return(
    <TableRow>
      <TableCell align='left'>Nombre : {value.name}</TableCell>
      <TableCell align='left'>Tipo de Falla : {value.typeFalla.name}</TableCell>
      <TableCell align='left'>Descripcion : {value.description}</TableCell>
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
