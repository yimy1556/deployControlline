import processViewActions from 'src/modules/config/process/view/processViewActions';

const initialData = {
  edicionStart : false,
  edition: null,
  viewControlLine: false
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
      edicionStart: false,
      edition: payload,
    };
  }
  
  if(type === processViewActions.PROCESS_VIEW_START){
    return{
      viewControlLine: true,
      edition:payload,
    }
  }

  if (type === processViewActions.VIEW_EDICION_FINISH) {
    return {
      ...initialData,
    };
  }
  
  return state;
}
