import faultListSelectors from 'src/modules/config/fault/list/faultListSelectors';
import actionsModal from 'src/modules/modal/modalActions';

const prefix = 'FAULT_VIEW';

const faultViewActions = {
  VIEW_EDICION_START: `${prefix}_EDICION_START`,
  VIEW_EDICION_FINISH: `${prefix}_EDICION_FINISH`,

  startEdicion: (id) => async (dispatch, getState) => {
    
    const rows = faultListSelectors.selectRowsFault(
      getState(),
    );
    console.log(rows);
    dispatch({ 
      type: faultViewActions.VIEW_EDICION_START,
      payload: rows.find(row => row.id === id),
    });
    dispatch(actionsModal.modalOpen());
  },

  finishEdicion: () => (dispatch) => {
    dispatch({ type: faultViewActions.VIEW_EDICION_FINISH});
  },
  
};

export default faultViewActions;
