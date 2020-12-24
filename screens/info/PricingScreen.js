import React from 'react';
import {  StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { LoadingIndicator } from '../../components';
const PricingScreen = (props) => {
  return (
    <WebView
      style={styles.flex1}
      startInLoadingState={true}
      renderLoading={LoadingIndicator}
      source={{ uri: 'https://www.skdentallab.co.uk/' }}
    />
  );
};
const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
export default PricingScreen;
