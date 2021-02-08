import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import FaultFilter from 'src/view/fault/list/FaultFilter';
import FaultTable from 'src/view/fault/list/FaultTable';
import Modal from 'src/view/shared/modals/Modal';
import FaultNew from 'src/view/fault/list/FaultNew';

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
