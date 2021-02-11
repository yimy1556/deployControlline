import checkpointService from 'src/modules/config/checkpoint/checkpointService';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import authActions from 'src/modules/auth/authActions';

const prefix = 'CHECKPOINT_FORM';

const checkpointFormActions = {
  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

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

  doUpdate: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.UPDATE_STARTED,
      });

      await UserService.edit(values);

      dispatch({
        type: userFormActions.UPDATE_SUCCESS,
      });

      const currentUser = authSelectors.selectCurrentUser(
        getState(),
      );

      if (currentUser.id === values.id) {
        await dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n('user.doUpdateSuccess'));

      getHistory().push('/user');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default userFormActions;
