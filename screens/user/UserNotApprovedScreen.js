import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatButton } from '../../components';
import { routes } from '../../constants/routes';
const UserNotApprovedScreen = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.userApproval}>
        Your account should be approved by the admin for accessing the application. Kindly
        contact admin to approve your account and login again after approval
      </Text>
      <FlatButton
        style={styles.logout}
        title={'Logout'}
        onPress={() => navigation.navigate(routes.Logout)}
      />
    </View>
  );
};

export default UserNotApprovedScreen;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  userApproval: {
    fontSize: 14,
    fontFamily: 'RalewayMedium',
    textAlign: 'center',
  },
  logout: {
    marginTop: 20,
    width: 100,
    alignSelf: 'center',
  },
});
