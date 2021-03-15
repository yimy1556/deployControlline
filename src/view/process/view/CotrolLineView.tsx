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
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Description from 'src/view/shared/view/Description';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
            borderBottom: 'unset',
          
    },
      
  },
  
});


export default function Row(props) {

  const { 
    row,
    doEdition,
    doCopy, 
    doDisabled,
    setDescription,
  } = props;
  const [open, setOpen] = useState(false);
  
  const saveDescription = () => {
    setDescription(row.description)
  };

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
        <TableCellCustom align="center">
          <Description 
            description = {row.description}
            setDescription = {saveDescription}
          />
        </TableCellCustom>
        <TableCell align="center"><UserStatusView value={row.status}/></TableCell>
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
              <Tooltip
                title={'Copiar'}
                onClick={() => doCopy(row.id)}
              >
                <IconButton
                  color="primary"
                  component={Link}
                  to={`/control_line/new_control_line`}
                >
                  <FileCopyIcon />
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
