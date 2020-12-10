import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import FlatButton from '../button/FlatButton';
import LogoBox from '../logoBox/LogoBox';
import ScrollWrapper from '../scrollWrapper/ScrollWrapper';
import ErrorText from './ErrorText';
import { routes } from '../../constants/routes';
import { useDispatch } from 'react-redux';
import { FormInputWrapper, FormTextInput, FormWrapper } from './FormComponents';
import { TouchableOpacity } from 'react-native-gesture-handler';
const UserSignInScreen = ({
  navigation,
  isLogin = true,
  email,
  onSubmit,
  loginButtonText = 'Login',
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
            <FormInputWrapper style={styles.singleFormFieldWrapper}>
              <FormTextInput
                placeholder='Email address'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                editable={isLogin}
              />
              <ErrorText errors={errors} touched={touched} name='email' />
            </FormInputWrapper>
            <FormInputWrapper style={styles.singleFormFieldWrapper}>
              <FormTextInput
                placeholder='Password'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={true}
              />
              <ErrorText errors={errors} touched={touched} name='password' />
            </FormInputWrapper>
            {isLogin ? (
              <FormInputWrapper>
                <TouchableOpacity
                  onPress={() => navigation.navigate(routes.Email)}
                >
                  <Text>Forgot Password</Text>
                </TouchableOpacity>
              </FormInputWrapper>
            ) : null}
            <View style={styles.loginButtonWrapper}>
              <FlatButton title={loginButtonText} onPress={handleSubmit} />
            </View>
            {isLogin ? (
              <View style={styles.registerButtonWrapper}>
                <FlatButton
                  style={styles.registerButton}
                  title='Register'
                  onPress={() => navigation.navigate(routes.UserSignUp)}
                />
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
    alignSelf: 'flex-end',
    margin: 10,
  },
  registerButtonWrapper: {
    alignSelf: 'center',
    margin: 25,
  },
  registerButton: {
    width: 150,
  },
});
export default UserSignInScreen;
