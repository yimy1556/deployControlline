import processService from 'src/modules/config/process/processService';
import modalActions from 'src/modules/modal/modalActions';
import processListActions from 'src/modules/config/process/list/processListActions';
import swal from 'sweetalert';
import { getHistory  } from 'src/modules/store';

const prefix = 'PROCESS_FORM';

const processFormActions = {
  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  LOAD_OPTION: `${prefix}_LOAD_OPTION`,



  DISABLED_STARTED: `${prefix}_DISABLED_STARTED`,
  DISABLED_SUCCESS: `${prefix}_DISABLED_SUCCESS`,
  DISABLED_ERROR: `${prefix}_DISABLED_ERROR`,

 

  doAdd: (values) => async (dispatch) => {
    if(values?.checkpoints?.length === 0){
      swal("Tadavia no asignaste puestos", "", "error");
      return;
    }
    try {
      dispatch({
        type: processFormActions.ADD_STARTED,
      });
      console.log(values)
      await processService.create(values);
      
      dispatch({
        type: processFormActions.ADD_SUCCESS,
      });
      
      getHistory().push('/process')
      dispatch(modalActions.closeModal());
      dispatch(processListActions.doFetchCurrentFilter());
    } catch (error) {
      console.log(error)
      dispatch({
        type: processFormActions.ADD_ERROR,
      });
    }
  },
};

export default processFormActions;
