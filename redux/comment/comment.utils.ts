import { IReaction } from '../../types';

import { updateReactionOnPost } from '../post/post.utils';

// Update reaction on 'comment' property of 'comment' state.
export const updateReactionOnComment = (
	reactions: IReaction[],
	newReactionObj: IReaction,
): IReaction[] => updateReactionOnPost(reactions, newReactionObj);
