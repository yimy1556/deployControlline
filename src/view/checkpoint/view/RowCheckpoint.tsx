import React , {useState}from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import NotInterested from '@material-ui/icons/NotInterested';
import { Box, Grid, Tooltip } from '@material-ui/core';
import { i18n } from 'src/i18n';
import UserStatusView from 'src/view/user/view/UserStatusView';
import TableSmall from 'src/view/process/view/TableSmall'; 
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import Description from 'src/view/shared/view/Description';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
            borderBottom: 'unset',
          
    },
      
  },
  
});

const openList = {
  openOperary: false,
  openFault: false,
}


export default function RowCheckpoint(props) {

  const { 
    row,
    doEdition, 
    doDisabled,
    setDescription, 
  } = props;
  
  const [open, setOpen] = useState(false);
  
  const [openInfo, setOpenInfo] = useState(openList); 
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align='center'>{row.name}</TableCell>
        <TableCell align="center">{row.controlType.name}</TableCell>
        <TableCell align="center">{row.category.name}</TableCell>
        <TableCellCustom size='md'lign="center">
          <Description description={row.description} setDescription={setDescription}/>
        </TableCellCustom>
        <TableCell align="center"><UserStatusView value={row.status || 'none'} /></TableCell>
        <TableCell size='small'>
          <Box
            display="flex"
            justifyContent="flex-end"
          >
            <Tooltip
              title={i18n('common.edit')}
            >
              <IconButton
                color="primary"
                onClick={() => doEdition(row.id)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={ row.status === "active"? i18n('common.disable'): "habilitar" }
              onClick={() => doDisabled(row.id)}
            >
              <IconButton
                color="primary"
              >
                {row.status === "active"? <NotInterested />: <CheckIcon/>}
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0  }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <List>
                <Grid container>
                  <Grid item xs={6}>
                    <ListItem 
                      button 
                      onClick={() => setOpenInfo({...openList,openOperary:!openInfo.openOperary})}
                    >
                      <ListItemText primary="Operarios" />
                        {openInfo.openOperary ?<KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </ListItem>
                    <Collapse in={openInfo.openOperary} timeout="auto" unmountOnExit>
                      <Table size="small" aria-label="purchases">
                        <TableBody>
                          {row.operatorsCheckpoint.map((user,index) => (
                            <TableRow key={index}>
                              <TableCell align='left'>Nombre : {user.user.fullName}</TableCell>
                              <TableCell align='left'> Email : {user.user.email}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Collapse>
                  </Grid>
                  <Grid item xs={6}>
                    <ListItem button onClick={() => setOpenInfo({...openList,openFault:!openInfo.openFault})}>
                      <ListItemText primary="Fallas" />
                      {openInfo.openFault ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </ListItem>
                    <Collapse in={openInfo.openFault} timeout="auto" unmountOnExit>
                      <TableSmall values={row.checkpointDetails} />
                    </Collapse>
                  </Grid>
                </Grid>
              </List>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
