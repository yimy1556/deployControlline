import { connectRouter } from 'connected-react-router';
import layout from 'src/modules/layout/layoutReducers';
import auth from 'src/modules/auth/authReducers';
import user from 'src/modules/user/userReducers';
import modal from 'src/modules/modal/modalReducers';
import config from 'src/modules/config/configReducers';
import controlLineExecution from 'src/modules/controlLineExecution/controlLineExecutionReducers';
import { combineReducers } from 'redux';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    layout,
    auth,
    user,
    modal,
    config,
    controlLineExecution,
  });
