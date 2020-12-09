import React from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ThemeColors } from '../../constants/Colors';
import FlatButton from '../button/FlatButton';
import LogoBox from '../logoBox/LogoBox';
import ScrollWrapper from '../scrollWrapper/ScrollWrapper';
import ErrorText from './ErrorText';
import { routes } from '../../constants/routes';
import { useDispatch } from 'react-redux';
import { userSignin } from '../../store/actions';
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
          <View style={styles.wrapper}>
            <LogoBox />
            <View style={styles.singleFormFieldWrapper}>
              <TextInput
                placeholder='Email address'
                style={styles.textInput}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                editable={isLogin}
              />
              <ErrorText errors={errors} touched={touched} name='email' />
            </View>
            <View style={styles.singleFormFieldWrapper}>
              <TextInput
                placeholder='Password'
                style={styles.textInput}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry={true}
              />
              <ErrorText errors={errors} touched={touched} name='password' />
            </View>
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
          </View>
        )}
      </Formik>
    </ScrollWrapper>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    paddingTop: 100,
  },
  singleFormFieldWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  textLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textInput: {
    width: '100%',
    marginBottom: 10,
    borderBottomColor: ThemeColors.listItemBorder,
    borderBottomWidth: 1,
  },
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
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    paddingTop: 10,
    paddingBottom: 10,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: ThemeColors.primary,
    backgroundColor: ThemeColors.primary,
  },
});
export default UserSignInScreen;
