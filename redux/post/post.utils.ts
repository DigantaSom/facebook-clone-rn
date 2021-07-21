import { IReaction, AddOrDeleteType } from '../../types';

export const updateReactionOnPost = (
	reactions: IReaction[],
	newReactionObj: IReaction,
): IReaction[] => {
	const userReactedElementIndex = reactions.findIndex(
		r => r.reactorId === newReactionObj.reactorId,
	);

	// if the user has already reacted to this post
	if (userReactedElementIndex !== -1) {
		// if the user wants to change (not remove) their reaction
		if (newReactionObj.reaction !== '') {
			reactions[userReactedElementIndex].reaction = newReactionObj.reaction;
			return reactions;
		} else if (newReactionObj.reaction === '') {
			// if the user wants to remove their reaction
			return reactions.filter(r => r.reactorId !== newReactionObj.reactorId);
		}
	} else {
		// if the user still hasn't reacted to this post and their current reaction is not ''
		if (newReactionObj.reaction !== '') {
			return [newReactionObj, ...reactions];
		}
	}

	return reactions;
};

// Update 'commentCount' field on post reducer, after a comment is successfully added/deleted from comment state.
export const updateCommentCountOnPost = (
	commentCount: number,
	actionType: AddOrDeleteType,
): number => {
	let updatedCommentCount: number = commentCount;

	if (actionType === 'add') {
		updatedCommentCount = commentCount + 1;
	} else if (actionType === 'delete') {
		updatedCommentCount = commentCount - 1;
	}

	return updatedCommentCount;
};
