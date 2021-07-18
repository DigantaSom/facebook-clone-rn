export type IconNameType =
  | 'local-hospital'
  | 'user-friends'
  | 'shop'
  | 'account-group'
  | 'ondemand-video'
  | 'clock-outline'
  | 'save'
  | 'flag-outline'
  | 'calendar'
  | 'gamepad'
  | 'facebook';

type MenuDataItemType = {
  id: number;
  title: string;
  iconName: IconNameType;
};

type MenuDataType = MenuDataItemType[];

const menuScreenData: MenuDataType = [
  {
    id: 1,
    title: 'COVID-19 Information Center',
    iconName: 'local-hospital',
  },
  {
    id: 2,
    title: 'Friends',
    iconName: 'user-friends',
  },
  {
    id: 3,
    title: 'Marketplace',
    iconName: 'shop',
  },
  {
    id: 4,
    title: 'Groups',
    iconName: 'account-group',
  },
  {
    id: 5,
    title: 'Videos on Watch',
    iconName: 'ondemand-video',
  },
  {
    id: 6,
    title: 'Memories',
    iconName: 'clock-outline',
  },
  {
    id: 7,
    title: 'Saved',
    iconName: 'save',
  },
  {
    id: 8,
    title: 'Pages',
    iconName: 'flag-outline',
  },
  {
    id: 9,
    title: 'Events',
    iconName: 'calendar',
  },
  {
    id: 10,
    title: 'Gaming',
    iconName: 'gamepad',
  },
  {
    id: 11,
    title: 'Update Facebook',
    iconName: 'facebook',
  },
];

export default menuScreenData;
