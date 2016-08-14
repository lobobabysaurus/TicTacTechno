import { combineReducers } from 'redux';

import login        from 'reducers/user/login';
import registration from 'reducers/user/registration';


export default combineReducers({
  login,
  registration,
});
