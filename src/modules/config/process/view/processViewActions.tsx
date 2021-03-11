import processListSelectors from 'src/modules/config/process/list/processListSelectors';
import actionsModal from  'src/modules/modal/modalActions';

const prefix = 'PROCESS_VIEW';

const processViewActions = {
  VIEW_EDICION_START: `${prefix}_EDICION_START`,
  VIEW_EDICION_FINISH: `${prefix}_EDICION_FINISH`,
  PROCESS_VIEW_START: `${prefix}_START`,

  VIEW_COPY: `${prefix}_COPY`,

  startViewFault: (id) => (dispatch, getState) => {
    const view = processListSelectors
      .selectRows(getState())
      .find(fault => fault.id === id);

    dispatch({
      type: processViewActions.PROCESS_VIEW_START,
      payload: view,
    })
    dispatch(actionsModal.modalOpen());
  },
 

  startEdicion: (id) => async (dispatch, getState) => {    
    const rows = processListSelectors.selectRows(
      getState(),
    );

    dispatch({ 
      type: processViewActions.VIEW_EDICION_START,
      payload: rows.find(row => row.id === id),
    });
  },
  
  startCopy: (id) => async (dispatch, getState) => {
    
    const rows = processListSelectors.selectRows(
      getState(),
    );


    dispatch({ 
      type: processViewActions.VIEW_COPY,
      payload: rows.find(row => row.id === id),
    });
  },

  finishEdicion: () => (dispatch) => {
    dispatch({ type: processViewActions.VIEW_EDICION_FINISH});
  },
  
};

export default processViewActions;
