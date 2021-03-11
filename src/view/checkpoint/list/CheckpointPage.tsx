import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import CheckpointFilter from 'src/view/checkpoint/list/CheckpointFilter';
import CheckpointTable from 'src/view/checkpoint/list/CheckpointTable';
import Modal from 'src/view/shared/modals/Modal';
import Checkpoint from 'src/view/checkpoint/view/Checkpoint';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import AddIcon from '@material-ui/icons/Add';
import { Fab } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import actionsModal from 'src/modules/modal/modalActions';
import { useDispatch,useSelector } from 'react-redux';
import selectors from 'src/modules/config/checkpoint/view/checkpointViewSelectors';
import viewActions from 'src/modules/config/checkpoint/view/checkpointViewActions';

function CheckpointPage() {
  const dispatch = useDispatch();
  const openModel = () => {
    dispatch(viewActions.finishEdicion());
    dispatch(actionsModal.modalOpen());
  };

  const viewCheckpoint = useSelector(selectors.selectViewCheckpoint);

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('checkpoint.title')],
        ]}
      />
      <ContentWrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <PageTitle> {i18n('checkpoint.title')}</PageTitle>
          <Tooltip
            title={i18n('checkpoint.new')}
          >
            <Fab
              size="small"
              color="primary"
              onClick={openModel}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
        <CheckpointFilter />
        <CheckpointTable />
        <Modal sm={viewCheckpoint? 'sm':'md' }>
            <Checkpoint/>
        </Modal>
      </ContentWrapper>
    </>
  );
}

export default CheckpointPage;
