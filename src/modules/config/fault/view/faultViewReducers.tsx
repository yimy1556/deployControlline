import faultViewActions from 'src/modules/config/fault/view/faultViewActions';

const initialData = {
  edicionStart : false,
  edition: null,
  viewFault: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === faultViewActions.VIEW_EDICION_START){
    return {
      edicionStart: true,
      edition: payload,
    };
  }

  if(type === faultViewActions.FAULT_VIEW_START){
    return{
      viewFault: true,
      edition:payload,
    }
  }

  if (type === faultViewActions.VIEW_EDICION_FINISH) {
    return {
      ...initialData
    };
  }
  
  return state;
}
