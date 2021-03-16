import checkpointListSelectors from 'src/modules/config/checkpoint/list/checkpointListSelectors';
import actionsModal from 'src/modules/modal/modalActions';

const prefix = 'VIEW';

const checkpointViewActions = {
  VIEW_EDICION_START: `${prefix}_EDICION_START`,
  VIEW_EDICION_FINISH: `${prefix}_EDICION_FINISH`,
  
  VIEW_CHECKPOINT_START: `${prefix}_CHECKPOINT_START`,

  startEdicion: (id) => async (dispatch, getState) => {
    
    const rows = checkpointListSelectors.selectRows(
      getState(),
    );
    dispatch({ 
      type: checkpointViewActions.VIEW_EDICION_START,
      payload: rows.find(row => row.id === id),
    });
    dispatch(actionsModal.modalOpen());
  },

  finishEdicion: () => (dispatch) => {
    dispatch({ type: checkpointViewActions.VIEW_EDICION_FINISH});
  },
 
  startViewCheckpoint: (id) => (dispatch, getState) => {
    const viewCheckpoint = checkpointListSelectors
      .selectRows(getState())
      .find(fault => fault.id === id);

    dispatch({
      type: checkpointViewActions.VIEW_CHECKPOINT_START,
      payload: viewCheckpoint,
    })
    dispatch(actionsModal.modalOpen());
  },
 

};

export default checkpointViewActions;
