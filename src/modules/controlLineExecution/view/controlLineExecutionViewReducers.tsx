import checkpointViewActions from 'src/modules/config/checkpoint/view/checkpointViewActions';

const initialData = {
  edicionStart : false,
  edition: null,
  viewCheckpoint: false
};

export default (state = initialData, { type, payload }) => {
  if (type === checkpointViewActions.VIEW_EDICION_START){
    return {
      edicionStart: true,
      edition: payload,
    };
  }

  if (type === checkpointViewActions.VIEW_EDICION_FINISH) {
    return {
      edicionStart: false,
      edition: null,
    };
  }
  
  if(type === checkpointViewActions.VIEW_CHECKPOINT_START){
    return{
      viewCheckpoint: true,
      edition: payload,
    }
  }

  return state;
}
