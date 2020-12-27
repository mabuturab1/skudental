import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FlatButton from '../button/FlatButton';
import {
  UserVerificationStatus,
  getUserVerificationLabel,
} from '../../constants/UIConstants';
import { ThemeColors } from '../../constants/Colors';
const UserVerification = ({ user, onVerify, verifyUserLoading, disableButtons=false }) => {
  const data = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
  ];
  const showApproveButton = () =>
    user?.role?.verifiedByAdmin === UserVerificationStatus.Pending ||
    user?.role?.verifiedByAdmin === UserVerificationStatus.Rejected;
  const showRejectedButton = () =>
    user?.role?.verifiedByAdmin === UserVerificationStatus.Pending ||
    user?.role?.verifiedByAdmin === UserVerificationStatus.Approved;
  return (
    <View style={styles.wrapper}>
      {data.map((el, index) => (
        <View key={index} style={styles.textItem}>
          <Text style={styles.label}>{el.label}</Text>
          <Text styles={styles.value}>{user[el.key]}</Text>
        </View>
      ))}
      <View style={styles.textItem}>
        <Text style={styles.label}>Verification Status</Text>
        <Text styles={styles.value}>
          {getUserVerificationLabel(user?.role?.verifiedByAdmin)}
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        {showRejectedButton() ? (
          <FlatButton
            style={{
              ...styles.singleButton,
              backgroundColor: ThemeColors.red,
              borderColor: ThemeColors.red,
            }}
            loading={verifyUserLoading}
            disabled={disableButtons}
            title={'Reject'}
            onPress={() => onVerify(user, UserVerificationStatus.Rejected)}
          />
        ) : null}
        {showApproveButton() ? (
          <FlatButton
            style={styles.singleButton}
            disabled={disableButtons}
            loading={verifyUserLoading}
            title={'Approve'}
            onPress={() => onVerify(user, UserVerificationStatus.Approved)}
          />
        ) : null}
      </View>
    </View>
  );
};
export default UserVerification;
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 10,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontFamily: 'RalewayBold',
    paddingHorizontal: 20,
  },
  textItem: { flexDirection: 'row', marginVertical: 10 },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
  },
  singleButton: { width: 100, marginHorizontal: 10 },
});
