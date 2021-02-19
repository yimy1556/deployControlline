import React from 'react';
import ContentWrapper from '../../../view/layout/styles/ContentWrapper';
import PageTitle from '../../../view/shared/styles/PageTitle';
import FaultTable from 'src/view/fault/list/FaultTable';
import FaultFilter from '../../../view/fault/list/FaultFilter';
import Modal from '../../../view/shared/modals/Modal';
import FaultNew from '../../../view/fault/list/FaultNew';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import { i18n } from 'src/i18n';

function FaultPage() {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          ['Gestión de fallas'],
        ]}
      />
      <ContentWrapper>
        <PageTitle>Gestión de fallas</PageTitle>
        <FaultFilter />
        <FaultTable />
        <Modal><FaultNew /></Modal>
      </ContentWrapper>
    </>
  );
}

export default FaultPage;
