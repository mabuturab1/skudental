import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
const LoadingIndicator = ({ color, alignCenter = true }) => {
  let indicatorStyles = { ...styles.centerAlign };
  if (!alignCenter) {
    indicatorStyles = {};
  }
  return (
    <View style={indicatorStyles}>
      <ActivityIndicator size={'large'} color={color || '#00ff00'} />
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
