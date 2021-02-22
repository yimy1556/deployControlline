import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import ProcessFilter from 'src/view/process/list/ProcessFilter';
import ProcessTable from 'src/view/process/list/ProcessTable';
import Modal from 'src/view/shared/modals/Modal';
import ProcessDischarge from 'src/view/process/view/ProcessDischarge';
import Breadcrumb from 'src/view/shared/Breadcrumb';

function ProcessPage() {
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          ['Gestión De Línea De Control'],
        ]}
      />
      <ContentWrapper>
        <PageTitle> Gestión De Línea De Control</PageTitle>
        <ProcessFilter />
        <ProcessTable />
        <Modal><ProcessDischarge /></Modal>
      </ContentWrapper>
    </>
  );
}

export default ProcessPage;
