import React, { useState } from 'react';

import { UserSigninForm } from '../../components';
import { routes } from '../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { confirmPassword } from '../../store/actions';
import { StackActions } from '@react-navigation/native';
const ConfirmPasswordScreen = ({ route, navigation }) => {
  const { routeToNavigate } = route.params;
  const dispatch = useDispatch();
  const [confirming, setConfirming] = useState(false);
  const email = useSelector(({ auth }) => auth.user.email);
  const onLoginSubmit = (values) => {
    values = { ...values, email: values.email.trim().toLowerCase() };
    setConfirming(true);
    dispatch(
      confirmPassword(values, (isSuccess) => {
        if (isSuccess)
          navigation.dispatch(
            StackActions.replace(routeToNavigate, {
              initPassword: values.password,
            })
          );
        else setConfirming(false);
      })
    );
  };

  return (
    <UserSigninForm
      navigation={navigation}
      isLogin={false}
      onSubmit={onLoginSubmit}
      loading={confirming}
      loginButtonText={'Confirm Password'}
      email={email}
    />
  );
};

export default ConfirmPasswordScreen;
