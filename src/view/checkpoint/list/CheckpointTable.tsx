import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import actions from 'src/modules/config/checkpoint/list/checkpointListActions';
import actionsView from 'src/modules/config/checkpoint/view/checkpointViewActions';
import { i18n } from 'src/i18n';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import Row from 'src/view/checkpoint/view/RowCheckpoint';
import { Box } from '@material-ui/core';

function CheckpointTable() {
  const dispatch = useDispatch();
  const [
    recordIdToDisabled,
    setRecordIdToDisabled,
  ] = useState(null);

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );

  const hasRows = useSelector(selectors.selectHasRows);

  const doEdition = (id) => {
    dispatch(actionsView.startEdicion(id));
  }

  const doDisabled = (id) => {
    setRecordIdToDisabled(null);
    dispatch(actions.doDisabled(id));
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

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
              <TableCell />
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Tipo de control</TableCell>
              <TableCell align="center">Categoria</TableCell>
              <TableCell align="center">Stado</TableCell>
              <TableCell/>
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
                  key={index}
                  row={row}
                  doEdition={doEdition}
                  doDisabled={setRecordIdToDisabled}
                />
              ))}
          </TableBody>
        </Table>
      </Box>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
      />

      {recordIdToDisabled && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDisabled(recordIdToDisabled)}
          onClose={() => setRecordIdToDisabled(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default CheckpointTable;
