import checkpoint from 'src/modules/config/checkpoint/checkpointReducers';
import process from 'src/modules/config/process/processReducers';
import fault from 'src/modules/config/fault/faultReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  checkpoint,
  process,
  fault,
});
