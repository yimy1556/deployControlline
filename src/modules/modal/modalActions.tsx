import checkpointViewActions from 'src/modules/config/checkpoint/view/checkpointViewActions';
import processViewActions from 'src/modules/config/process/view/processViewActions';

const prefix = 'MODAL';

const modalActions = {
  MODAL_OPEN: `${prefix}_OPEN`,
  MODAL_CLOSE: `${prefix}_CLOSE`,

  modalOpen: () => async (dispatch) => {
    dispatch({ type: modalActions.MODAL_OPEN});
  },

  closeModal: () => async (dispatch) => {
    dispatch(checkpointViewActions.finishEdicion());
    dispatch(processViewActions.finishEdicion());
    dispatch({ type: modalActions.MODAL_CLOSE});
  },

};

export default modalActions;
