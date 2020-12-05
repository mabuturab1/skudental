import React from 'react';
import { StyleSheet } from 'react-native';
import { LoadingIndicator } from '../../components';
import { WebView } from 'react-native-webview';
const SkSalesScreen = (props) => {
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
export default SkSalesScreen;
