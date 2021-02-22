import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'src/modules/config/fault/list/faultListSelectors';
import actions from 'src/modules/config/fault/list/faultListActions';
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


function FaultTable() {
  const dispatch = useDispatch();
  const [
    recordIdToDestroy,
    setRecordIdToDestroy,
  ] = useState(null);

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRowsFault);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  console.log(rows) 
  const hasRows = useSelector(selectors.selectHasRows);

  const doDestroy = (id) => {
    setRecordIdToDestroy(null);
//    dispatch(actions.doDestroy(id));
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
                name={'fullName'}
                label={'Nombre'}
              />
              <TableCellCustom  align='center'>
                Tipo de falla
              </TableCellCustom>
              <TableCellCustom  align='center'>
                Categoria
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
                  <TableCell align='center'>{row?.name || 'none'}</TableCell>
                  <TableCell align='center'>{row.typeFalla.name}</TableCell>
                  <TableCell align='center'>{row.category.name}</TableCell>
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
