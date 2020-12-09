import React from 'react';

import { UserProfileForm } from '../../components';

import { useDispatch } from 'react-redux';
import { userSignup } from '../../store/actions';
import { routes } from '../../constants/routes';

const UserSignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const onSignupSubmit = (values) => {
    delete values.confirmPassword;
    values = { ...values, email: values.email.trim().toLowerCase() };
    dispatch(
      userSignup(values, (isSuccess) => {
        if (isSuccess)
          navigation.reset({
            index: 0,
            routes: [{ name: routes.UserSignIn }],
          });
      })
    );
  };

  return <UserProfileForm navigation={navigation} onSubmit={onSignupSubmit} />;
};

export default UserSignUpScreen;
