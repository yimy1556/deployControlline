import processService from 'src/modules/config/process/processService';
import modalActions from 'src/modules/modal/modalActions';
import processListActions from 'src/modules/config/process/list/processListActions';

const prefix = 'PROCESS_FORM';

const processFormActions = {
  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  doAdd: (values) => async (dispatch) => {
    try {
      dispatch({
        type: processFormActions.ADD_STARTED,
      });
      console.log(values)
      await processService.create(values);
      
      dispatch({
        type: processFormActions.ADD_SUCCESS,
      });
      
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
