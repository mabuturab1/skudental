import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Constants } from 'react-native-unimodules';
const ScrollWrapper = ({ children }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>{children}</ScrollView>
  </SafeAreaView>
);
export default ScrollWrapper;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
