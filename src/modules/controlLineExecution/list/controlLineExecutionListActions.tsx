import controlLineService from 'src/modules/config/process/processService';
import selectors from 'src/modules/controlLineExecution/list/controlLineExecutionListSelectors';
import swal from 'sweetalert';
import modalActions from 'src/modules/modal/modalActions'

const prefix = 'CONTROL_LINE_EXECUTION_LIST';

const controlLineExecutionListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  LOAD_OPTION: `${prefix}_LOAD_OPTION`,

  RESETED: `${prefix}_RESETED`,
  
  MODIFY : 'MODIFY',

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

  DISABLED_STARTED: `${prefix}_DISABLED_STARTED`,
  DISABLED_SUCCESS: `${prefix}_DISABLED_SUCCESS`,
  DISABLED_ERROR: `${prefix}_DISABLED_ERROR`,

  doDisabled: (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: controlLineExecutionListActions.DISABLED_STARTED,
      });


      dispatch({
        type: controlLineExecutionListActions.DISABLED_SUCCESS,
      });
      dispatch(controlLineExecutionListActions.doFetchCurrentFilter());
    } catch (error) {

      dispatch({
        type: controlLineExecutionListActions.DISABLED_ERROR,
      });

      dispatch(controlLineExecutionListActions.doFetchCurrentFilter());
    }
  },

  doChangePagination: (pagination) => async (
    dispatch,
    getState,
  ) => {
    dispatch({
      type: controlLineExecutionListActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(controlLineExecutionListActions.doFetchCurrentFilter());
  },

  doLoadOption: () => async (dispatch) => {
    
    const response = await controlLineService.doControlLineActive()
    console.log(response)
    const option = response.rows.reduce(
      (acc,el) => ([...acc,{
        label: [`${el.sku}-${el.name}`],
        value: el.id, 
        category: el.category.id,
        }]),
      [],
    );

    dispatch({
      type: controlLineExecutionListActions.LOAD_OPTION,
      payload: option,
    })
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: controlLineExecutionListActions.RESETED,
    });

    dispatch(controlLineExecutionListActions.doFetch());
  },
  editStatus: (controlLineExecution) => async (
    dispatch,
    getState
  ) => {
    
    const newAux = selectors
      .selectRows(getState())
      .map(ele => {
        if(ele.id === controlLineExecution.id){
         ele.status = controlLineExecution.newStatus;
        }
        return ele;
      }); 
    dispatch({
      type: controlLineExecutionListActions.MODIFY,
      payload: newAux,
    })
  },
  doFetchCurrentFilter: () => async (
    dispatch,
    getState,
  ) => {
    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    dispatch(controlLineExecutionListActions.doFetch(filter, rawFilter, true));
  },

  doFetch: (filter?, rawFilter?, keepPagination = false) => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: controlLineExecutionListActions.FETCH_STARTED,
        payload: { filter, rawFilter, keepPagination },
      });
/*
      const response = await Service.fetchCheckpoint(
        filter,
        selectors.selectLimit(getState()),
        selectors.selectOffset(getState()),
      );

      dispatch({
        type: controlLineExecutionListActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });*/
    } catch (error) {

      dispatch({
        type: controlLineExecutionListActions.FETCH_ERROR,
      });
    }
  },
  doCreate: (value) => async (dispatch) => {
   /* try {
      const response = await checkpointService.create(value);
      if (response) {
        dispatch(
          modalActions.closeModal()
        )
        swal("Se ha creado el puesto de control correctamente", "", "success");
        dispatch(
          controlLineExecutionListActions.doFetchCurrentFilter(),
        )
      } else {
        swal("Existe un puesto de control con el mismo nombre para esta categoría", "", "error");
      }
    }
    catch (error) {
      swal("Error al crear un puesto de control", "", "error");
    }
    */
  },

};

export default controlLineExecutionListActions;
