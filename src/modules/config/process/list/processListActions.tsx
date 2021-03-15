import processService from 'src/modules/config/process/processService';
import selectors from 'src/modules/config/process/list/processListSelectors';
import modalActions from 'src/modules/modal/modalActions';
import swal from 'sweetalert';
import { getHistory  } from 'src/modules/store';
import IndustrialPlantService from '../../service/IndustrialPlantService';
import checkpointListActions from '../../checkpoint/list/checkpointListActions';
import CheckponitService from '../../checkpoint/checkpointService';

const prefix = 'PROCESS_LIST';

const processListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  
  LOAD_OPTION: `${prefix}_LOAD_OPTION`,

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

  doLoadOption: () => async (dispatch) => {
    
    dispatch(checkpointListActions.doLoadOption());

    const optionIndustrialPlant = await IndustrialPlantService.fetchIndustrialPlant();
    const optionCheckpoint = await CheckponitService.fetchCheckpointActive();
  

    const opIn = optionIndustrialPlant.rows.reduce((acc, el) => ([...acc, { value: el.id, label: el.name }]), []);
    const op = optionCheckpoint.rows.reduce((acc, el) => (
      [...acc, 
        { value: el.id, 
          label: el.name,
          categoryId: el.category.id,
        }])
      , []);


    dispatch({
      type: processListActions.LOAD_OPTION,
      payload: {
        checkpoint: op,
        industrialPlants: opIn,
      }
    })
  },


  doEdit: (value) => async (dispatch) => {
    if(value?.checkpoints?.length === 0){
      swal("Tadavia no asignaste puestos", "", "error");
      return;
    }
  try {
    const response = await processService.edit(value);
      if (response) {
        dispatch(modalActions.closeModal());
        swal("Se Pudo modificar correctamente la linea de Control", "", "success");
        dispatch(
          processListActions.doFetchCurrentFilter(),
        );
        getHistory().push('/process');
      } else {
        swal("Nombre o Sku de linea de control repetido", "", "error");
      }
    }catch (error) {
      swal("Error al modificar la linea de control", "", "error");
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

    dispatch(processListActions.doFetchCurrentFilter());
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
        selectors.selectOffset(getState()),
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
