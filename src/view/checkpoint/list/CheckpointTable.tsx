import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import actions from 'src/modules/config/checkpoint/list/checkpointListActions';
import actionsView from 'src/modules/config/checkpoint/view/checkpointViewActions';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import Pagination from 'src/view/shared/table/Pagination';
import Spinner from 'src/view/shared/Spinner';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import NotInterested from '@material-ui/icons/NotInterested';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import UserStatusView from 'src/view/user/view/UserStatusView';
import actionsCheckpoint from 'src/modules/config/checkpoint/list/checkpointListActions';

function CheckpointTable() {
  const dispatch = useDispatch();
  const [
    recordIdToDestroy,
    setRecordIdToDestroy,
  ] = useState(null);

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  console.log(rows)
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);

  const doEdition = (id) => {
    dispatch(actionsView.startEdicion(id));
  }
  /*
  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(actions.doDestroy(id));
  };
   */
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
              <TableCellCustom
                hasRows={hasRows}
                name={'nombre'}
                align='center'
                label={i18n('user.fields.firstName')}
              />
              <TableCellCustom
                hasRows={hasRows}
                align='center'
                name={'fullName'}
                label={i18n('checkpoint.fields.controlType')}
              />
              <TableCellCustom
                hasRows={hasRows}
                align='center'
                name={'fullName'}
                label={'Categoria'}
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
                <TableRow key={index}>
                  <TableCell align='center'>{row?.name}</TableCell>
                  <TableCell align='center'>{row?.controlType?.name}</TableCell>
                  <TableCell align='center'>{row?.category?.name}</TableCell>
                  <TableCell align='center'> <UserStatusView value={row.status} /></TableCell>
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
                          onClick={() => doEdition(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={i18n('common.disable')}
                        onClick={() => dispatch(actionsCheckpoint.disabled(row.id))}
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

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
      />

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default CheckpointTable;
