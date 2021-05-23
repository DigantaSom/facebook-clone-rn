import React from 'react';
import {
  Fontisto,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

type ProfileWidgetTitleType = 'Photos' | 'Life Events' | 'Music' | 'Did You Know';

type ProfileWidgetType = {
  id: number;
  title: ProfileWidgetTitleType;
  Icon: () => JSX.Element;
};

const profileWidgets: ProfileWidgetType[] = [
  {
    id: 1,
    title: 'Photos',
    Icon: () => <Fontisto name='photograph' size={20} color='#f4f4f4' />,
  },
  {
    id: 2,
    title: 'Life Events',
    Icon: () => <MaterialIcons name='emoji-events' size={20} color='#f4f4f4' />,
  },
  {
    id: 3,
    title: 'Music',
    Icon: () => <Ionicons name='musical-notes-sharp' size={20} color='#f4f4f4' />,
  },
  {
    id: 4,
    title: 'Did You Know',
    Icon: () => <MaterialCommunityIcons name='lightbulb-on' size={20} color='#f4f4f4' />,
  },
];

export default profileWidgets;
