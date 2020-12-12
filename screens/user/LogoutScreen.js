import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { LoadingIndicator } from '../../components';
import { routes } from '../../constants/routes';
import { userLogout } from '../../store/actions';
const LogoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userLogout());
    navigation.reset({
      index: 0,
      routes: [{ name: routes.Auth }],
    })
  }, [dispatch]);
  return (
    <View style={styles.wrapper}>
      <LoadingIndicator />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
export default LogoutScreen;
