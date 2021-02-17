import checkpointService from 'src/modules/config/checkpoint/checkpointService';
import selectors from 'src/modules/config/checkpoint/list/checkpointListSelectors';

const prefix = 'CHECKPOINT_LIST';

const checkpointListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  doChangePagination: (pagination) => async (
    dispatch,
    getState,
  ) => {
    dispatch({
      type: checkpointListActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(checkpointListActions.doFetchCurrentFilter());
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: checkpointListActions.RESETED,
    });

    dispatch(checkpointListActions.doFetch());
  },
 
  doFetchCurrentFilter: () => async (
    dispatch,
    getState,
  ) => {
    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    dispatch(checkpointListActions.doFetch(filter, rawFilter, true));
  },
  
  doFetch: (filter?, rawFilter?, keepPagination = false) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: checkpointListActions.FETCH_STARTED,
        payload: { filter, rawFilter, keepPagination },
      });

      const response = await checkpointService.fetchCheckpoint(
        filter,
        selectors.selectLimit(getState()),
      );

      dispatch({
        type: checkpointListActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      
      dispatch({
        type: checkpointListActions.FETCH_ERROR,
      });
    }
  },

};

export default checkpointListActions;
