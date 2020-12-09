import React from 'react';

import { UserSigninForm } from '../../components';
import { routes } from '../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { confirmPassword } from '../../store/actions';
import { StackActions } from '@react-navigation/native';
const ConfirmPasswordScreen = ({ route, navigation }) => {
  const { routeToNavigate } = route.params;
  const dispatch = useDispatch();
  const email = useSelector(({ auth }) => auth.user.email);
  const onLoginSubmit = (values) => {
    values = { ...values, email: values.email.trim().toLowerCase() };
    dispatch(
      confirmPassword(values, (isSuccess) => {
        if (isSuccess)
          navigation.dispatch(StackActions.replace(routeToNavigate));
      })
    );
  };

  return (
    <UserSigninForm
      navigation={navigation}
      isLogin={false}
      onSubmit={onLoginSubmit}
      loginButtonText={'Confirm Password'}
      email={email}
    />
  );
};

export default ConfirmPasswordScreen;
