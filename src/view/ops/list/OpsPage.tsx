import React from 'react';
import { i18n } from '../../../i18n';
import ContentWrapper from '../../../view/layout/styles/ContentWrapper';
import PageTitle from '../../../view/shared/styles/PageTitle';
import OpsFilter from '../../../view/ops/list/OpsFilter';
import OpsTable from '../../../view/ops/list/OpsTable';
import Ops from '../../../view/ops/view/Ops';
import Modal from '../../../view/shared/modals/Modal';
import Checkpoint from '../../../view/checkpoint/view/Checkpoint';
import Breadcrumb from '../../../view/shared/Breadcrumb';
import AddIcon from '@material-ui/icons/Add';
import { Fab } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import actionsModal from 'src/modules/modal/modalActions';
import { useDispatch } from 'react-redux';

function OpsPage() {
    const dispatch = useDispatch();
    const openModel = () => {
        dispatch(actionsModal.modalOpen());
    };
    return (
        <>
            <Breadcrumb
                items={[
                    [i18n('dashboard.menu'), '/'],
                    [i18n('process.title')],
                ]}
            />
            <ContentWrapper>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <PageTitle>{i18n('process.title')}</PageTitle>
                    <Tooltip
                        title={i18n('process.newControlLine')}
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
                <OpsFilter />
                <OpsTable />
                <Modal><Ops></Ops></Modal>
            </ContentWrapper>
        </>
    );
}

export default OpsPage;
