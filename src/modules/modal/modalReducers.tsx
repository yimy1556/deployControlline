import modalActions from 'src/modules/modal/modalActions';

const initialData = {
  open: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === modalActions.MODAL_OPEN) {
    return {
      open: true,
    };
  }

  if (type === modalActions.MODAL_CLOSE) {
    return {
      open: false,
    };
  }
  
  return state;
}
