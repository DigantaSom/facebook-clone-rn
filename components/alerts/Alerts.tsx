import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

const Alerts = () => {
  const alerts = useSelector((state: RootState) => state.alert.alerts);

  return (
    <View style={styles.container}>
      {alerts.length > 0 &&
        alerts.map(alert => (
          <View
            key={alert.id}
            style={[
              styles.item,
              {
                backgroundColor:
                  alert.alertType === 'success' ? Colors.success : Colors.danger
              }
            ]}>
            <Text style={styles.text}>{alert.msg}</Text>
          </View>
        ))}
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    bottom: 55,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  item: {
    padding: 8,
    marginTop: 8,
    borderRadius: 4,
    width: Layout.isSmallDevice ? Layout.window.width * 0.75 : Layout.window.width / 2
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15
  }
});
