import list from 'src/modules/config/process/list/processListReducers';
import form from 'src/modules/config/process/form/processFormReducers';
import view from 'src/modules/config/process/view/processViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
});
