import checkpointService from 'src/modules/config/checkpoint/checkpointService';

const prefix = 'CHECKPOINT_FORM';

const checkpointFormActions = {
  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  doAdd: (values) => async (dispatch) => {
    try {
      dispatch({
        type: checkpointFormActions.ADD_STARTED,
      });

      await checkpointService.create(values);

      dispatch({
        type: checkpointFormActions.ADD_SUCCESS,
      });

    } catch (error) {
      dispatch({
        type: checkpointFormActions.ADD_ERROR,
      });
    }
  },
};

export default checkpointFormActions;
