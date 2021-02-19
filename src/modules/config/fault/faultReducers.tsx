import list from 'src/modules/config/fault/list/faultListReducers';
import form from 'src/modules/config/fault/form/faultFormReducers';
import view from 'src/modules/config/fault/view/faultViewReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
});
