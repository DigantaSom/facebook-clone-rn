import { IReaction } from '../../types';

import { updateReactionOnPost } from '../post/post.utils';

// Update reaction on 'reply' property of 'reply' state.
export const updateReactionOnReply = (
	reactions: IReaction[],
	newReactionObj: IReaction,
): IReaction[] => updateReactionOnPost(reactions, newReactionObj);
