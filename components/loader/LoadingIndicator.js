import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
const LoadingIndicator = ({color = '#00ff00', alignCenter = true}={}) => {
  // const { color = '#00ff00', alignCenter = true } = props || {};
  let indicatorStyles = { ...styles.centerAlign };
  if (!alignCenter) {
    indicatorStyles = {};
  }
  return (
    <View style={indicatorStyles}>
      <ActivityIndicator size={'large'} color={color} />
    </View>
  );
};
export default LoadingIndicator;
const styles = StyleSheet.create({
  centerAlign: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
