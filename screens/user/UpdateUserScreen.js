import React from 'react';

import { UserProfileForm } from '../../components';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../store/actions';
import { auth } from '../../helpers/firebase/Firebase';

const UpdateUserScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { initPassword } = route.params;
  const { user, loading } = useSelector(({ auth }) => ({
    user: auth.user,
    loading: auth.loading.updateUser,
  }));
  const onUpdateUser = async (values) => {
    delete values.confirmPassword;
    if (values.password && values.password !== initPassword) {
      await auth.currentUser.updatePassword(values.password);
    }
    values = { ...values, email: values.email.trim().toLowerCase() };
    dispatch(
      updateUser(values, (isSuccess) => {
        if (isSuccess) navigation.goBack();
      })
    );
  };

  return (
    <UserProfileForm
      onSubmit={onUpdateUser}
      isSignup={false}
      loading={loading}
      initValues={{ ...user, password: initPassword }}
    />
  );
};

export default UpdateUserScreen;
