import faultListSelectors from 'src/modules/config/fault/list/faultListSelectors';
import actionsModal from 'src/modules/modal/modalActions';

const prefix = 'FAULT_VIEW';

const faultViewActions = {
  FAULT_VIEW_START: `${prefix}_START`,
  VIEW_EDICION_START: `${prefix}_EDICION_START`,
  VIEW_EDICION_FINISH: `${prefix}_EDICION_FINISH`,

  startViewFault: (id) => (dispatch, getState) => {
    const viewFault = faultListSelectors
      .selectRowsFault(getState())
      .find(fault => fault.id === id);

    dispatch({
      type: faultViewActions.FAULT_VIEW_START,
      payload: viewFault,
    })
    dispatch(actionsModal.modalOpen());
  },
  

  startEdicion: (id) => async (dispatch, getState) => {
    
    const rows = faultListSelectors.selectRowsFault(
      getState(),
    );
    console.log(rows);
    dispatch(actionsModal.modalOpen());
    dispatch({ 
      type: faultViewActions.VIEW_EDICION_START,
      payload: rows.find(row => row.id === id),
    });
  },

  finishEdicion: () => (dispatch) => {
    dispatch({ type: faultViewActions.VIEW_EDICION_FINISH});
  },
  
};

export default faultViewActions;
