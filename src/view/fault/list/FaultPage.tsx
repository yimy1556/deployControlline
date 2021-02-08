import React from 'react';
import ContentWrapper from '../../../view/layout/styles/ContentWrapper';
import PageTitle from '../../../view/shared/styles/PageTitle';
import FaultFilter from '../../../view/fault/list/FaultFilter';
import FaultTable from '../../../view/fault/list/FaultTable';
import Modal from '../../../view/shared/modals/Modal';
import FaultNew from '../../../view/fault/list/FaultNew';

function FaultPage() {
  return (
    <ContentWrapper>
      <PageTitle>Gestion de fallas</PageTitle>
      <FaultFilter />
      <FaultTable />
      <Modal><FaultNew /></Modal>
    </ContentWrapper>
  );
}

export default FaultPage;
