import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userSelectors from 'src/modules/user/userSelectors';
import selectors from 'src/modules/user/list/userListSelectors';
import actions from 'src/modules/user/list/userListActions';
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
import Port from 'src/view/process/list/pro'


function FaultTable() {
  const dispatch = useDispatch();
  const [
    recordIdToDestroy,
    setRecordIdToDestroy,
  ] = useState(null);

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    userSelectors.selectPermissionToDestroy,
  );

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
    dispatch(actions.doDestroy(id));
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
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
                onSort={doChangeSort}
                hasRows={hasRows}
                sorter={sorter}
                name={'nombre'}
                align='center'
                label={i18n('user.fields.firstName')}
              />
              <TableCellCustom
                onSort={doChangeSort}
                hasRows={hasRows}
                align='center'
                sorter={sorter}
                name={'fullName'}
                label={i18n('process.fields.sku')}
              />
              <TableCellCustom  align='center'>
                {i18n('process.fields.plant')}
              </TableCellCustom>
              <TableCellCustom  align='center'>
                {i18n('process.fields.numberOfCheckpoint')}
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
            {!true && !true && (
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
            {true &&
              Port.map((row, index) => (
                <TableRow key={index}>
                  <TableCell align='center'>{row.firstName}</TableCell>
                  <TableCell align='center'>{row.sku}</TableCell>
                  <TableCell align='center'>{row.plant}</TableCell>
                  <TableCell align='center'>{row.numberOfCheckpoint}</TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                    >
                      {true && (
                        <Tooltip
                          title={i18n('common.edit')}
                        >
                          <IconButton
                            color="primary"
                            component={Link}
                            to={`/user/${row.id}/edit`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {true && (
                        <Tooltip
                          title={i18n('common.disable')}
                        >
                          <IconButton
                            color="primary"
                          >
                            <NotInterested />
                          </IconButton>
                        </Tooltip>
                      )}
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
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => setRecordIdToDestroy(null)}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default FaultTable;
