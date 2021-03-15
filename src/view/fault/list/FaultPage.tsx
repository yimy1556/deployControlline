import React from 'react';
import ContentWrapper from '../../../view/layout/styles/ContentWrapper';
import PageTitle from '../../../view/shared/styles/PageTitle';
import FaultTable from 'src/view/fault/list/FaultTable';
import FaultFilter from '../../../view/fault/list/FaultFilter';
import Modal from '../../../view/shared/modals/Modal';
import FaultNew from '../../../view/fault/list/FaultNew';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import { i18n } from 'src/i18n';
import AddIcon from '@material-ui/icons/Add';
import { Fab } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import actionsModal from 'src/modules/modal/modalActions';
import { useDispatch } from 'react-redux';
import viewActions from 'src/modules/config/fault/view/faultViewActions';

function FaultPage() {
  const dispatch = useDispatch();
  const openModel = () => {
    dispatch(viewActions.finishEdicion());
    dispatch(actionsModal.modalOpen());
  };

  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('faults.title')],
        ]}
      />
      <ContentWrapper>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <PageTitle> {i18n('faults.title')}</PageTitle>
          <Tooltip
            title={i18n('faults.newfaults')}
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
        <FaultFilter />
        <FaultTable />
        <Modal sm={'sm'}>
          <FaultNew />
        </Modal>
      </ContentWrapper>
    </>
  );
}

export default FaultPage;
