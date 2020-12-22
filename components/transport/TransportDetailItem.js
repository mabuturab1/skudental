import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Role } from '../../constants/UIConstants';
import { useSelector } from 'react-redux';
import TransportStatusItem from './TransprtStatusItem';
const UserVerification = ({
  transportRequest,
  onUpdateStatus,
  updateTransportRequestLoading,
  disableButtons = false,
}) => {
  const data = [
    { label: 'Address', key: 'address' },
    { label: 'Postal Code', key: 'postalCode' },
    { label: 'City', key: 'city' },
    { label: 'State', key: 'state' },
    { label: 'Country', key: 'country' },
    { label: 'Status', key: 'status' },
  ];
  const user = useSelector(({ auth }) => auth.user);
  const isAdmin = () => user?.role?.roleType === Role.Admin;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.transportRequestTitle}>
        Trasnport Request
        {` ${
          transportRequest?.requestOwner?.name
            ? 'By: ' + transportRequest?.requestOwner?.name
            : ''
        }`}
      </Text>
      {data.map((el, index) => (
        <View key={index} style={styles.textItem}>
          <Text style={styles.label}>{el.label}</Text>
          <Text styles={styles.value}>{transportRequest[el.key]}</Text>
        </View>
      ))}
      {isAdmin() ? (
        <TransportStatusItem
          initValue={transportRequest?.status}
          onSave={onUpdateStatus}
          loading={updateTransportRequestLoading}
          disableButton={disableButtons}
        />
      ) : null}
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
  transportRequestTitle: {
    fontFamily: 'RobotoBold',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontFamily: 'RobotoBold',
    paddingHorizontal: 20,
    width: 200,
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
