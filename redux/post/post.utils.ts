import { IReaction } from '../../types';

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
