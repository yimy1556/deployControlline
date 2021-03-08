import processService from 'src/modules/config/process/processService';
import modalActions from 'src/modules/modal/modalActions';
import processListActions from 'src/modules/config/process/list/processListActions';
import swal from 'sweetalert';
import { getHistory  } from 'src/modules/store';
import {i18n} from 'src/i18n';

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
      const { status, message } =  await processService.create(values);
      swal(i18n(`controlLineCreate.${message}.${status}`), "", i18n(status.toLowerCase()));
      
      if(status === "error"){return;}
      
      dispatch({type: processFormActions.ADD_SUCCESS}); 
      getHistory().push('/process');
    } catch (error) {
      dispatch({
        type: processFormActions.ADD_ERROR,
      });
    }
  },
};

export default processFormActions;
