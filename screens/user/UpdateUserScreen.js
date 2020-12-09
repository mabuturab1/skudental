import React from 'react';

import * as Yup from 'yup';
import moment from 'moment';
import { UserProfileForm } from '../../components';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/actions';

const UpdateUserScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  console.log('user init values are', user);
  const onUpdateUser = (values) => {
    delete values.confirmPassword;
    values = { ...values, email: values.email.trim().toLowerCase() };
    dispatch(updateUser(values, (isSuccess) => {}));
  };

  return (
    <UserProfileForm
      onSubmit={onUpdateUser}
      isSignup={false}
      initValues={user}
    />
  );
};

export default UpdateUserScreen;
