import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import ProcessFilter from 'src/view/process/list/ProcessFilter';
import ProcessTable from 'src/view/process/list/ProcessTable';
import Modal from 'src/view/shared/modals/Modal';
import ProcessDischarge from 'src/view/process/view/ProcessDischarge';

function ProcessPage() {
  return (
    <ContentWrapper>
      <PageTitle>Linea De Controles</PageTitle>
      <ProcessFilter />
      <ProcessTable />
      <Modal><ProcessDischarge/></Modal>
    </ContentWrapper>
  );
}

export default ProcessPage;
