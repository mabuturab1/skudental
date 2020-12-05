import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
const UserSignupScreen = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text>User Signup Screen</Text>
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
export default UserSignupScreen;
