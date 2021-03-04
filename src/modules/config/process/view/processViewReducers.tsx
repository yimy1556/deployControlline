import processViewActions from 'src/modules/config/process/view/processViewActions';

const initialData = {
  edicionStart : false,
  edition: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === processViewActions.VIEW_EDICION_START){
    return {
      edicionStart: true,
      edition: payload,
    };
  }
  if (type === processViewActions.VIEW_COPY){
    return {
      edition: payload,
    };
  }

  if (type === processViewActions.VIEW_EDICION_FINISH) {
    return {
      edicionStart: false,
      edition: null,
    };
  }
  
  return state;
}
