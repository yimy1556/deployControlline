import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import ContentWrapper from '../../../view/layout/styles/ContentWrapper';
import { Box } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import NotInterested from '@material-ui/icons/NotInterested';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import UserStatusView from 'src/view/user/view/UserStatusView';
import Spinner from 'src/view/shared/Spinner';
import IconButton from '@material-ui/core/IconButton';
import { i18n } from 'src/i18n';

function OpsTable() {
    const hasRows = useSelector(selectors.selectHasRows);
    const loading = useSelector(selectors.selectLoading);
    const rows = [1, 2, 3, 4]

    return (
        <>
            <Box
                style={{
                    display: 'block',
                    width: '100%',
                    overflowX: 'auto',
                    marginTop: '10px',
                }}
            >
                <Table
                    style={{
                        borderRadius: '5px',
                        border: '1px solid rgb(224, 224, 224)',
                        borderCollapse: 'initial',
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCellCustom
                                hasRows={hasRows}
                                name={'id'}
                                align='center'
                                label={'Id'}
                            />
                            <TableCellCustom
                                hasRows={hasRows}
                                align='center'
                                name={'process'}
                                label={'Línea de control'}
                            />
                            <TableCellCustom
                                hasRows={hasRows}
                                align='center'
                                name={'fechaDeAlta'}
                                label={'Fecha de alta'}
                            />
                            <TableCellCustom
                                hasRows={hasRows}
                                align='center'
                                name={'usuario'}
                                label={'Ejecutor'}
                            />
                            <TableCellCustom align='center'>
                                Estado
                              </TableCellCustom>
                            <TableCellCustom size="md"></TableCellCustom>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading && (
                            <TableRow>
                                <TableCell colSpan={100}>
                                    <Spinner />
                                </TableCell>
                            </TableRow>
                        )}

                        {!loading &&
                            rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align='center'>{index}</TableCell>
                                    <TableCell align='center'>Heladeras</TableCell>
                                    <TableCell align='center'>2021-03-01</TableCell>
                                    <TableCell align='center'>usuario{index}</TableCell>
                                    <TableCell align='center'> <UserStatusView value={'iniciada'} /></TableCell>
                                    <TableCell>
                                        <Box
                                            display="flex"
                                            justifyContent="flex-end"
                                        >

                                            <Tooltip
                                                title={i18n('common.edit')}
                                            >
                                                <IconButton
                                                    color="primary"

                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title={i18n('common.disable')}
                                            >
                                                <IconButton
                                                    color="primary"
                                                >
                                                    <NotInterested />
                                                </IconButton>
                                            </Tooltip>

                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Box>
        </>
    );
}

export default OpsTable;
