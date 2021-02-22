import processService from 'src/modules/config/process/processService';
import selectors from 'src/modules/config/process/list/processListSelectors';

const prefix = 'PROCESS_LIST';

const processListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

  DISABLED_STARTED: `${prefix}_DISABLED_STARTED`,
  DISABLED_SUCCESS: `${prefix}_DISABLED_SUCCESS`,
  DISABLED_ERROR: `${prefix}_DISABLED_ERROR`,

  doDisabled: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: processListActions.DISABLED_STARTED,
      });

      await processService.doDisabled(id);

      dispatch({
        type: processListActions.DISABLED_SUCCESS,
      });


      dispatch(processListActions.doFetchCurrentFilter());
    } catch (error) {

      dispatch({
        type: processListActions.DISABLED_ERROR,
      });

      dispatch(processListActions.doFetchCurrentFilter());
    }
  },

  doChangePagination: (pagination) => async (
    dispatch,
    getState,
  ) => {
    dispatch({
      type: processListActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(processListActions.doFetchCurrentFilter());
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: processListActions.RESETED,
    });

    dispatch(processListActions.doFetch());
  },
 
  doFetchCurrentFilter: () => async (
    dispatch,
    getState,
  ) => {
    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    dispatch(processListActions.doFetch(filter, rawFilter, true));
  },
  
  doFetch: (filter?, rawFilter?, keepPagination = false) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: processListActions.FETCH_STARTED,
        payload: { filter, rawFilter, keepPagination },
      });

      const response = await processService.fetchProcess(
        filter,
        selectors.selectLimit(getState()),
      );
      dispatch({
        type: processListActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      
      dispatch({
        type: processListActions.FETCH_ERROR,
      });
    }
  },

};

export default processListActions;
