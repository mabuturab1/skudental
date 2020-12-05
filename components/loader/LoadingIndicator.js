import React from 'react';
import { ActivityIndicator, View } from 'react-native';
const LoadingIndicator = () => {
  const positionAbsolute = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  return (
    <View style={positionAbsolute}>
      <ActivityIndicator size={'large'} color='#00ff00' />
    </View>
  );
};
export default LoadingIndicator;
