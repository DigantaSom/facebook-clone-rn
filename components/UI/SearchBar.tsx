import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { searchProfiles } from '../../redux/profile/profile.actions';

import { View } from '../Themed';
import Colors from '../../constants/Colors';

interface SearchBarProps {
	searchBarDisabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchBarDisabled }) => {
	const [searchText, setSearchText] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(searchProfiles(searchText));
	}, [searchText]);

	return (
		<View style={styles.searchSection}>
			<Ionicons
				name='md-search'
				size={24}
				color={Colors.dark.tabIconDefault}
				style={styles.icon}
			/>
			<TextInput
				value={searchText}
				onChangeText={text => setSearchText(text)}
				style={styles.input}
				editable={!searchBarDisabled}
				placeholder='Search'
				placeholderTextColor='#b3b3b3'
				autoFocus
			/>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	searchSection: {
		backgroundColor: Colors.defaultTextInputColor,
		borderRadius: 20,
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	icon: {
		paddingRight: 5,
	},
	input: {
		paddingVertical: 5,
		flex: 1,
		color: 'white',
	},
});
