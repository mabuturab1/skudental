import React from 'react';

import { UserProfileForm } from '../../components';

import { useDispatch, useSelector } from 'react-redux';
import { userSignin, userSignup, sendEmail } from '../../store/actions';
import { routes } from '../../constants/routes';

const UserSignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const loading = useSelector(({ auth }) => auth.loading.userSignup);
  const autoSignIn = (values) => {
    dispatch(
      userSignin(
        { email: values.email, password: values.password },
        (isSuccess) => {
          if (isSuccess) {
            // dispatch(sendEmail());
            navigation.reset({
              index: 0,
              routes: [{ name: routes.UserNotApproved }],
            });
          }
        }
      )
    );
  };
  const onSignupSubmit = (values) => {
    delete values.confirmPassword;
    values = { ...values, email: values.email.trim().toLowerCase() };
    dispatch(
      userSignup(values, (isSuccess) => {
        if (isSuccess) autoSignIn(values);
      })
    );
  };

  return <UserProfileForm loading={loading} navigation={navigation} onSubmit={onSignupSubmit} />;
};

export default UserSignUpScreen;
