import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
const RecordInquiryScreen = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text>Record Inquriy Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default RecordInquiryScreen;
