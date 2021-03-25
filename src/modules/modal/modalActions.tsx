import checkpointViewActions from 'src/modules/config/checkpoint/view/checkpointViewActions';
import processViewActions from 'src/modules/config/process/view/processViewActions';
import faultViewActions from 'src/modules/config/fault/view/faultViewActions';

const prefix = 'MODAL';

const modalActions = {
  MODAL_OPEN: `${prefix}_OPEN`,
  MODAL_CLOSE: `${prefix}_CLOSE`,

  modalOpen: () => async (dispatch) => {
    dispatch({ type: modalActions.MODAL_OPEN});
  },

  closeModal: () => async (dispatch) => {
    dispatch({ type: modalActions.MODAL_CLOSE});
  },

  closeModalCheckpoint: () => (dispatch) => {
    dispatch({ type: modalActions.MODAL_CLOSE});
  }

};

export default modalActions;
