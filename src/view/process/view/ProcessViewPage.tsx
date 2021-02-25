import React from 'react';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import ProcessFilter from 'src/view/process/list/ProcessFilter';
import ProcessTable from 'src/view/process/list/ProcessTable';
import Modal from 'src/view/shared/modals/Modal';
import ProcessDischarge from 'src/view/process/view/ProcessDischarge';
import Breadcrumb from 'src/view/shared/Breadcrumb';

const  textTheWelcome = (typeWindows) => {
  return typeWindows? 
    'Edicion de linea de control':
    'Configuaracion de linea de control';
}

function ProcessViewPage(props) {
  const { match } = props;
  const textWelcome = textTheWelcome(match?.params?.id);

  console.log(props)
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          ['Gestión De Línea De Control'],
          [`${textWelcome}`],
        ]}
      />
      <ContentWrapper>
        <PageTitle>{textWelcome}</PageTitle>
        <ProcessDischarge />
      </ContentWrapper>
    </>
  );
}

export default ProcessViewPage;
