const prefix = 'AUTH';

const modalActions = {
  MODAL_OPEN: `${prefix}_OPEN`,
  MODAL_CLOSE: `${prefix}_CLOSE`,

  modalOpen: () => async (dispatch) => {
    dispatch({ type: modalActions.MODAL_OPEN});
  },

  closeModal: () => async (dispatch) => {
    dispatch({ type: modalActions.MODAL_CLOSE});
  },

};

export default modalActions;
