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
import Status from 'src/view/ops/view/ButtonState';
import ModalStatus from 'src/view/shared/modals/ModalStatus';
import Row from '../view/OpsView'
function OpsTable() {
    const hasRows = useSelector(selectors.selectHasRows);
    const loading = useSelector(selectors.selectLoading);
    const rows = [1, 2, 3, 4]
    const [
        recordIdToDisabled,
        setRecordIdToDisabled,
    ] = useState(null);

    const [
        description,
        setDescription,
    ] = useState(null);


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
                            <TableCellCustom />
                            <TableCellCustom
                                hasRows={hasRows}
                                name={'id'}
                                align='center'
                                label={i18n('process.fields.id')}
                            />
                            <TableCellCustom
                                hasRows={hasRows}
                                align='center'
                                name={'process'}
                                label={i18n('process.fields.controlLine')}
                            />
                            <TableCellCustom
                                hasRows={hasRows}
                                align='center'
                                name={'fechaDeAlta'}
                                label={i18n('process.fields.date')}
                            />
                            <TableCellCustom
                                hasRows={hasRows}
                                align='center'
                                name={'dateModification'}
                                label={i18n('process.fields.dateModification')}
                            />
                            <TableCellCustom align='center'>
                                {i18n('user.fields.status')}
                            </TableCellCustom>

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
                        {!loading && !hasRows && (
                            <TableRow>
                                <TableCell colSpan={100}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {i18n('table.noData')}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        {!loading &&
                            rows.map((row, index) => (
                                <Row
                                    setDescription={setDescription}
                                    key={index}
                                    row={row}
                                    doDisabled={setRecordIdToDisabled}
                                />
                            ))}
                    </TableBody>
                </Table>
            </Box>
        </>
    );
}

export default OpsTable;
