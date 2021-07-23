import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import profileReducer from './profile/profile.reducer';
import albumReducer from './album/album.reducer';
import postReducer from './post/post.reducer';
import commentReducer from './comment/comment.reducer';
import replyReducer from './reply/reply.reducer';

export default combineReducers({
	user: userReducer,
	profile: profileReducer,
	album: albumReducer,
	post: postReducer,
	comment: commentReducer,
	reply: replyReducer,
});
