import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'src/modules/controlLineExecution/list/controlLineExecutionListSelectors';
import ContentWrapper from '../../../view/layout/styles/ContentWrapper';
import { Box } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Spinner from 'src/view/shared/Spinner';
import { i18n } from 'src/i18n';
import ModalStatus from 'src/view/shared/modals/ModalStatus';
import Row from '../view/OpsView'

function OpsTable() {
    const hasRows =  true///useSelector(selectors.selectHasRows);
    const loading = false//useSelector(selectors.selectLoading);
    const rows = [1, 2, 3, 4]
    
    const rws = useSelector(selectors.selectRows);

    console.log(rws)

    const [
        description,
        setDescription,
    ] = useState(null);


    const [status, setStatus] = useState(null);

 
  useEffect(() => {
      console.log('12')
  }, [status]);



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
                            <TableCellCustom size='sm' align='center'>
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
                            rws.map((row, index) => (
                                <Row
                                    setDescription={setDescription}
                                    setStatus={setStatus}
                                    key={index}
                                    row={row}
                                />
                            ))}
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
        </>
    );
}

export default OpsTable;
