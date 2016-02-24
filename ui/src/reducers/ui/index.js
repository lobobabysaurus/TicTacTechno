import { combineReducers } from 'redux';

import { showLogin } from 'reducers/ui/login';
import registration from 'reducers/ui/registration';

export default combineReducers({
  registration,
  showLogin
});
