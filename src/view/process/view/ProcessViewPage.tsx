import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import ContentWrapper from 'src/view/layout/styles/ContentWrapper';
import PageTitle from 'src/view/shared/styles/PageTitle';
import ProcessFilter from 'src/view/process/list/ProcessFilter';
import ProcessTable from 'src/view/process/list/ProcessTable';
import Modal from 'src/view/shared/modals/Modal';
import ProcessDischarge from 'src/view/process/view/ProcessDischarge';
import Breadcrumb from 'src/view/shared/Breadcrumb';
import actionsView from 'src/modules/config/process/view/processViewActions';

const  textTheWelcome = (typeWindows) => {
  return typeWindows? 
    'Edicion de linea de control':
    'Configuaracion de linea de control';
}

function ProcessViewPage(props) {
  const { match } = props;
  const textWelcome = textTheWelcome(match?.params?.id);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actionsView.startEdicion(match?.params?.id));
    // eslint-disable-next-line
  }, [dispatch]);

  
  return (
    <>
      <Breadcrumb
        items={[
          [i18n('dashboard.menu'), '/'],
          ['Gestión De Línea De Control','/process'],
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
