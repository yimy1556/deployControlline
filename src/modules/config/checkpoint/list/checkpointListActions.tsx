import checkpointService from 'src/modules/config/checkpoint/checkpointService';
import CategoryService from 'src/modules/config/service/CategoryService';
import ControlTypeService from 'src/modules/config/service/ControlTypeService';
import selectors from 'src/modules/config/checkpoint/list/checkpointListSelectors';

const prefix = 'CHECKPOINT_LIST';

const checkpointListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,
  
  LOAD_OPTION: `${prefix}_LOAD_OPTION`,
  
  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

  DISABLED_STARTED: `${prefix}_DISABLED_STARTED`,
  DISABLED_SUCCESS: `${prefix}_DISABLED_SUCCESS`,
  DISABLED_ERROR: `${prefix}_DISABLED_ERROR`,

  doDisabled: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: checkpointListActions.DISABLED_STARTED,
      });

      await checkpointService.doDisabled(id);

      dispatch({
        type: checkpointListActions.DISABLED_SUCCESS,
      });


      dispatch(checkpointListActions.doFetchCurrentFilter());
    } catch (error) {

      dispatch({
        type: checkpointListActions.DISABLED_ERROR,
      });

      dispatch(checkpointListActions.doFetchCurrentFilter());
    }
  },

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

  doLoadOption: () => async (dispatch) => {
    const optionCategory = await CategoryService.fetchCheckpoint({}, {});
    const optionControlType = await ControlTypeService.fetchCheckpoint({},{});
    console.log('yimy')
    const op = optionCategory.rows.reduce((acc, el) => ([...acc, { value: el.id, label: el.name }]),[]);
    const opC = optionControlType.rows.reduce((acc, el) => ([...acc, { value: el.id, label: el.name }]),[]);

    dispatch({
      type: checkpointListActions.LOAD_OPTION,
      payload: {
        category: op,
        controlType: opC,
      }
    })
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
