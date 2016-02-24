import { combineReducers } from 'redux';

import login from 'reducers/ui/login';
import registration from 'reducers/ui/registration';

export default combineReducers({
  login,
  registration
});
