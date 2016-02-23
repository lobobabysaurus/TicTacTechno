import { combineReducers } from 'redux';

import ui from 'reducers/ui';
import users from 'reducers/user';

export default combineReducers({
  users,
  ui: ui
});
