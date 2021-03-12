import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'src/modules/config/fault/list/faultListSelectors';
import actions from 'src/modules/config/fault/list/faultListActions';
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
import CheckIcon from '@material-ui/icons/Check';
import TableCellCustom from 'src/view/shared/table/TableCellCustom';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import actionsView from 'src/modules/config/fault/view/faultViewActions';
import UserStatusView from 'src/view/user/view/UserStatusView';

function FaultTable() {
  const dispatch = useDispatch();
  const [
    recordIdToDisabled,
    setRecordIdToDisabled,
  ] = useState(null);

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRowsFault);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  
  const doDisabled = (id) => {
    setRecordIdToDisabled(null);
    dispatch(actions.disabled(id));
  };

  const doEdition = (id) => {
    dispatch(actionsView.startEdicion(id));
  }

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
                align='center'
                name={'fullName'}
                label={i18n('faults.fields.name')}
              />
              <TableCellCustom align='center'>
                {i18n('faults.fields.type')}
              </TableCellCustom>
              <TableCellCustom align='center'>
                {i18n('faults.fields.category')}
              </TableCellCustom>
              <TableCellCustom align='center'>
                {i18n('user.fields.status')}
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
                  <TableCell align='center'>{row?.name}
                  </TableCell>
                  <TableCell align='center'>{row.typeFalla.name}</TableCell>
                  <TableCell align='center'>{row.category.name}</TableCell>
                  <TableCell align='center'><UserStatusView value={row.status || 'none'} /></TableCell>
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
                          onClick={() => doEdition(row?.id)}
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

export default FaultTable;
