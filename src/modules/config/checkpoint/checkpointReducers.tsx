import list from 'src/modules/config/checkpoint/list/checkpointListReducers';
import form from 'src/modules/config/checkpoint/form/checkpointFormReducers';
import view from 'src/modules/config/checkpoint/view/checkpointViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
});
