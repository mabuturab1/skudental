import React from 'react';

import * as Yup from 'yup';
import moment from 'moment';
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

  return <UserProfileForm onSubmit={onSignupSubmit} />;
};

export default UserSignUpScreen;
