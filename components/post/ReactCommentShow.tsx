import React from 'react';
import { StyleSheet, View as ViewRN } from 'react-native';

import { Text } from '../Themed';

const ReactCommentShow: React.FC<{}> = ({}) => {
  return (
    <>
      <ViewRN style={styles.reactCommentContainer}>
        <Text style={styles.reactCommentText}>57 Reacts</Text>
        <Text style={styles.reactCommentText}>12 Comments</Text>
      </ViewRN>
    </>
  );
};

export default ReactCommentShow;

const styles = StyleSheet.create({
  reactCommentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  reactCommentText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
