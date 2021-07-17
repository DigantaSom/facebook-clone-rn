import { GenderType, GenderPronounType, PostType } from '../types';

const getGenderPronoun = (creatorGender: GenderType): GenderPronounType => {
	if (creatorGender === 'Female') {
		return 'her';
	} else if (creatorGender === 'Male') {
		return 'his';
	}
	return 'their';
};

export const getPostUploadText = (
	postType: PostType,
	creatorGender: GenderType,
): string => {
	let uploadText: string = '';

	if (postType === 'Profile Pic' || postType === 'Cover Pic') {
		uploadText = `uploaded ${getGenderPronoun(creatorGender)} ${postType.toLowerCase()}`;
	}
	return uploadText;
};
