import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import profileReducer from './profile/profile.reducer';
import albumReducer from './album/album.reducer';

export default combineReducers({
  user: userReducer,
  profile: profileReducer,
  album: albumReducer,
});
