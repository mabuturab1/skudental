import React from 'react';

import { UserProfileForm } from '../../components';

import { useDispatch } from 'react-redux';
import { userSignup } from '../../store/actions';

const UserSignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const onSignupSubmit = (values) => {
    delete values.confirmPassword;
    values = { ...values, email: values.email.trim().toLowerCase() };
    dispatch(userSignup(values, (isSuccess) => {}));
  };

  return <UserProfileForm navigation={navigation} onSubmit={onSignupSubmit} />;
};

export default UserSignUpScreen;
