import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FlatButton from '../button/FlatButton';
import LogoBox from '../logoBox/LogoBox';
import ScrollWrapper from '../scrollWrapper/ScrollWrapper';
import ErrorText from './ErrorText';
import { routes } from '../../constants/routes';
import { useDispatch } from 'react-redux';
import { FormInputWrapper, FormTextInput, FormWrapper, } from './FormComponents';
import { ThemeColors } from '../../constants/Colors';
const UserSignInScreen = ({
  navigation,
  isLogin = true,
  loading=false,
  email,
  onSubmit,
  loginButtonText = 'Log In',
}) => {
  const dispatch = useDispatch();
  const ValidationSchema = Yup.object({
    email: Yup.string().email().trim().required('Kindly enter your email'),
    password: Yup.string()
      .min(5, 'Password should be atleast 5 characters')
      .required('Kindly enter a valid password'),
  });

  const getInitValues = () => ({ email: email || '', password: '' });

  return (
    <ScrollWrapper>
      <Formik
        initialValues={getInitValues()}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <FormWrapper style={styles.wrapper}>
            <LogoBox />
            <FormInputWrapper>
              <FormTextInput
                placeholder='Email address'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                editable={isLogin}
              />
              <ErrorText errors={errors} touched={touched} name='email' />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                placeholder='Password'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={true}
              />
              <ErrorText errors={errors} touched={touched} name='password' />
            </FormInputWrapper>

            <FlatButton
              style={styles.loginButton}
              title={loginButtonText}
              onPress={handleSubmit}
              loading={loading}
            />

            {isLogin ? (
              <View style={styles.forgotPasswordWrapper}>
                <TouchableOpacity
                  activeOpacity={0.95}
                  onPress={() => navigation.navigate(routes.Email)}
                >
                  <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {isLogin ? (
              <View style={styles.registerButtonWrapper}>
                <Text style={styles.registerButtonText}>
                  Dont't have an account?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate(routes.UserSignUp)}
                >
                  <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </FormWrapper>
        )}
      </Formik>
    </ScrollWrapper>
  );
};
const styles = StyleSheet.create({
  loginButtonWrapper: {
    width: '100%',
  },
  forgotPasswordWrapper: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButtonWrapper: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerButtonText: {
    fontFamily: 'RalewayLight',
  },
  signupText: {
    fontFamily: 'RalewayRegular',
    color: ThemeColors.primary,
    paddingLeft: 5,
  },
  forgotPassword: {
    fontFamily: 'RalewayLight',
    color: ThemeColors.lightBlack,
  },
});
export default UserSignInScreen;
