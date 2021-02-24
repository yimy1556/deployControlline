import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import CheckpointFilter from 'src/view/checkpoint/list/CheckpointFilter';
import CheckpointTable from 'src/view/checkpoint/list/CheckpointTable';
import Modal from 'src/view/shared/modals/Modal';
import Checkpoint from 'src/view/checkpoint/view/Checkpoint';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function CheckpointPage() {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          ['Gestión de Puesto de Control'],
        ]}
      />
      <ContentWrapper>
        <PageTitle>Gestión de Puesto de Control</PageTitle>
        <CheckpointFilter />
        <CheckpointTable />
        <Modal><Checkpoint /></Modal>
      </ContentWrapper>
    </>
  );
}

export default CheckpointPage;
