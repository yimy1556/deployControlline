import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import ProcessFilter from 'src/view/process/list/ProcessFilter';
import ProcessTable from 'src/view/process/list/ProcessTable';
import Modal from 'src/view/shared/modals/Modal';
import ProcessDischarge from 'src/view/process/view/ProcessDischarge';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import AddIcon from '@material-ui/icons/Add';
import { Fab } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import actionsModal from 'src/modules/modal/modalActions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function ProcessPage() {
  const dispatch = useDispatch();
  const openModel = () => {
    dispatch(actionsModal.modalOpen());
  };
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          [i18n('controlLine.title')],
        ]}
      />
      <ContentWrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <PageTitle>{i18n('controlLine.title')}</PageTitle>
          <Tooltip
            title={i18n('controlLine.newControlLine')}
          >
            <Fab
              size="small"
              color="primary"
              component={Link}
              to={`/process/new-process`}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </div>
        <ProcessFilter />
        <ProcessTable />
        <Modal><ProcessDischarge /></Modal>
      </ContentWrapper>
    </>
  );
}

export default ProcessPage;
