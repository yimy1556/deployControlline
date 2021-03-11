import React , {useState}from 'react';
import { makeStyles  } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import NotInterested from '@material-ui/icons/NotInterested';
import { Box, Tooltip } from '@material-ui/core';
import { i18n } from 'src/i18n';
import UserStatusView from 'src/view/user/view/UserStatusView';
import TableSmall from 'src/view/process/view/TableSmallCheckpoint'; 
import { Link } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
            borderBottom: 'unset',
          
    },
      
  },
  
});


export default function Row(props) {

  const { row, doEdition, doDisabled } = props;
  const [open, setOpen] = useState(false);
  
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
        <TableCell align="center">{row.sku}</TableCell>  
        <TableCell align="center">{row.category.name}</TableCell>
        <TableCell align="center">{row.industrialPlant.name}</TableCell>
        <TableCell align="center"><UserStatusView value={row.status || 'none'} /></TableCell>
        <TableCell>
          <Box
            display="flex"
            justifyContent="flex-end"
          >
            <Tooltip
              title={i18n('common.edit')}
              onClick={() => doEdition(row.id)}
            >
              <IconButton
                color="primary"
                component={Link}
                to={`/control_line/${row.id}/edit_control_line`}
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
              <TableSmall values={row.checkpoints} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
