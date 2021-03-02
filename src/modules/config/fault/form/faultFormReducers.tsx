import actions from 'src/modules/config/checkpoint/form/checkpointFormActions';

const initialData = {
  initLoading: false,
  saveLoading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ADD_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.ADD_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.ADD_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
