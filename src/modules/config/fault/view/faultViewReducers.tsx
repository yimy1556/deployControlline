import faultViewActions from 'src/modules/config/fault/view/faultViewActions';

const initialData = {
  edicionStart : false,
  edition: {},
};

export default (state = initialData, { type, payload }) => {
  if (type === faultViewActions.VIEW_EDICION_START){
    return {
      edicionStart: true,
      edition: payload,
    };
  }

  if (type === faultViewActions.VIEW_EDICION_FINISH) {
    return {
      edicionStart: false,
      edition: {},
    };
  }
  
  return state;
}
