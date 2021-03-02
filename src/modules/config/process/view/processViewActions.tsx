import processListSelectors from 'src/modules/config/process/list/processListSelectors';

const prefix = 'PROCESS_VIEW';

const processViewActions = {
  VIEW_EDICION_START: `${prefix}_EDICION_START`,
  VIEW_EDICION_FINISH: `${prefix}_EDICION_FINISH`,

  startEdicion: (id) => async (dispatch, getState) => {
    
    const rows = processListSelectors.selectRows(
      getState(),
    );


    dispatch({ 
      type: processViewActions.VIEW_EDICION_START,
      payload: rows.find(row => row.id === id),
    });
  },

  finishEdicion: () => (dispatch) => {
    dispatch({ type: processViewActions.VIEW_EDICION_FINISH});
  },
  
};

export default processViewActions;
