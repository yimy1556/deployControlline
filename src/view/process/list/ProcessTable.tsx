import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'src/modules/config/process/list/processListSelectors';
import actions from 'src/modules/config/process/list/processListActions';
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
import actionsView from 'src/modules/config/process/view/processViewActions';
import UserStatusView from 'src/view/user/view/UserStatusView';
import { Link } from 'react-router-dom';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CheckIcon from '@material-ui/icons/Check';

function ProcessTable() {
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
              <TableCellCustom
                align='center'
                label={i18n('user.fields.firstName')}
              />
              <TableCellCustom
                align='center'
                label={i18n('process.fields.sku')}
              />
              <TableCellCustom align='center'>
                {i18n('process.fields.plant')}
              </TableCellCustom>
              <TableCellCustom
                align='center'
                label='Estado'
              />
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
                  <TableCell align='center'>{row?.name || 'none'}</TableCell>
                  <TableCell align='center'>{row?.sku || 'none'}</TableCell>
                  <TableCell align='center'>{row?.industrialPlant?.name || 'none'}</TableCell>
                  <TableCell align='center'><UserStatusView value={row.status} /></TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <Tooltip
                        title={i18n('common.edit')}
                        onClick={() => dispatch(actionsView.startEdicion(row.id))}
                      >
                        <IconButton
                          color="primary"
                          component={Link}
                          to={`/process/${row.id}/edit-process`}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={i18n('common.disable')}
                        onClick={() => setRecordIdToDisabled(row.id)}
                      >
                        <IconButton
                          color="primary"
                        >
                          <NotInterested />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={'Habilitar'}
                      >
                        <IconButton
                          color="primary"
                        >
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={'Copiar'}
                      >
                        <IconButton
                          color="primary"
                        >
                          <FileCopyIcon />
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

export default ProcessTable;
