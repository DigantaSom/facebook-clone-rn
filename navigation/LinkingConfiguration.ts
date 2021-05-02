/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Facebook: {
            screens: {
              Home: {
                screens: {
                  HomeScreen: 'home'
                }
              },
              Videos: {
                screens: {
                  VideosScreen: 'videos'
                }
              },
              Groups: {
                screens: {
                  GroupsScreen: 'groups'
                }
              },
              Notifications: {
                screens: {
                  NotificationScreen: 'notifications'
                }
              },
              More: {
                screens: {
                  MoreScreen: 'more'
                }
              }
            }
          },
          Search: {
            screens: {
              SearchScreen: 'search'
            }
          }
        }
      }
      // NotFound: '*'
    }
  }
};
