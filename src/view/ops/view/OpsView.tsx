import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import NotInterested from '@material-ui/icons/NotInterested';
import { Box, Tooltip } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Status from 'src/view/ops/view/ButtonState';
import ModalStatus from 'src/view/shared/modals/ModalStatus';
import { i18n } from 'src/i18n';
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',

        },

    },

});


export default function Row(props) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [status, setStatus] = useState(null);
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
                <TableCell align='center'>{row}</TableCell>
                <TableCell align='center'>Linea de control Heladeras {row}</TableCell>
                <TableCell align="center">2021-03-13</TableCell>
                <TableCell align="center">2021-03-15</TableCell>
                <TableCell align='center'>
                    <Status
                        setSelectedIndex={setSelectedIndex}
                        selectedIndex={selectedIndex}
                        values={{
                            status: 'Activa',
                        }}
                        setValues={setStatus}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align='left'>Usuario : Usuario1</TableCell>
                                        <TableCell align='left'>Fecha de modificación : 2021-03-15</TableCell>
                                        <TableCell align='left'>Estado: Activo</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                        {status && (
                            <ModalStatus
                                title={i18n('common.areYouSure')}
                                content={status}
                                onClose={() => setStatus(null)}
                                okText={i18n('common.yes')}
                                cancelText={i18n('common.no')}
                            />
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}
