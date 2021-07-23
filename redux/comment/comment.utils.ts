import { IReaction, AddOrDeleteType } from '../../types';

import { updateReactionOnPost, updateCommentCountOnPost } from '../post/post.utils';

// Update reaction on 'comment' property of 'comment' state.
export const updateReactionOnComment = (
	reactions: IReaction[],
	newReactionObj: IReaction,
): IReaction[] => updateReactionOnPost(reactions, newReactionObj);

// Update 'replyCount' field on comment reducer, after a reply is successfully added/deleted to/from reply state.
export const updateReplyCountOnComment = (
	replyCount: number,
	actionType: AddOrDeleteType,
) => updateCommentCountOnPost(replyCount, actionType);
