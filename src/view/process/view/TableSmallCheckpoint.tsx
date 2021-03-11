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

const RowTableSmall = ({ value, index }) => {
  const [open, setOpen] = React.useState(false);
  return(<>
    <TableRow>
      <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell> 
      <TableCell align='center'>{index}</TableCell>
      <TableCell align='center'>{value.name}</TableCell>
      <TableCell align='center'>{value.controlType.name}</TableCell>
      <TableCell align='center'>{value.category.name}</TableCell>
      <TableCell align='center'>{value.checkpointDetails.length}</TableCell>
      <TableCell align='center'><UserStatusView value={value.status}/></TableCell>
    </TableRow>
    <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0  }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h5" align='center' gutterBottom component="div">
                Descripcion
              </Typography>
              <Typography variant="h6" align='center'>
                {value.description}
              </Typography>

           </Box>
          </Collapse>
        </TableCell>
      </TableRow>

  </>)
};


export default function TableSmallCheckpoint({ values }){

  return(
    <>
      <Table size="small" aria-label="purchases">
        <TableHead>
          <TableRow>
            <TableCell/>

            <TableCell align='center'>Puesto</TableCell>
            <TableCell align='center'>Nombre</TableCell>
            <TableCell align='center'>Tipo de control</TableCell>
            <TableCell align='center'>Categoria</TableCell>
            <TableCell align='center'>Cant. Fallas</TableCell>
            <TableCell align='center'>Estado</TableCell>
          </TableRow>
        </TableHead>
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
