import React from 'react';

import { UserSigninForm } from '../../components';
import { routes } from '../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { userSignin } from '../../store/actions';
const UserSignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ auth }) => auth.loading.userSignin);
  const onLoginSubmit = (values) => {
    values = { ...values, email: values.email.trim().toLowerCase() };
    dispatch(
      userSignin(values, (isSuccess) => {
        if (isSuccess) navigation.navigate(routes.Home);
      })
    );
  };

  return (
    <UserSigninForm
      loading={loading}
      navigation={navigation}
      isLogin={true}
      onSubmit={onLoginSubmit}
    />
  );
};

export default UserSignInScreen;
