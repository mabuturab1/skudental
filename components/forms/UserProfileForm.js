import React, { Fragment } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Dropdown from '../../components/dropdown/Dropdown';
import FlatButton from '../../components/button/FlatButton';
import ScrollWrapper from '../../components/scrollWrapper/ScrollWrapper';
import { routes } from '../../constants/routes';
import { Role } from '../../constants/UIConstants';
import { ThemeColors } from '../../constants/Colors';
import ErrorText from './ErrorText';

const UserProfileForm = ({
  navigation,
  initValues = {},
  onSubmit,
  isSignup = true,
}) => {
  const getValidationSchema = () => {
    const signupObj = {
      password: Yup.string()
        .min(5, 'Password should be atleast 5 characters')
        .required('Kindly enter a valid password'),
    };
    const updateUserObj = {
      currentPassword: Yup.string()
        .min(5, 'Password should be atleast 5 characters')
        .required('Kindly enter a valid password'),
      newPassword: Yup.string()
        .min(5, 'Password should be atleast 5 characters')
        .required('Kindly enter a valid password'),
    };
    let schemaObj = {
      name: Yup.string().required('Kindly enter your name'),
      email: Yup.string()
        .trim()
        .email('Kindly enter a valid email')
        .required('Kindly enter your email'),

      confirmPassword: Yup.string()
        .min(5, 'Password should be atleast 5 characters')
        .required('Kindly enter a valid password'),
      role: Yup.number().required('Kindly select a role'),
    };
    const mergeObj = isSignup ? signupObj : updateUserObj;
    schemaObj = { ...schemaObj, ...mergeObj };
    return schemaObj;
  };
  const ValidationSchema = Yup.object(getValidationSchema());

  const getInitValues = () => ({
    name: initValues['name'] || '',
    password: isSignup ? '' : undefined,
    newPassword: !isSignup ? '' : undefined,
    currentPassword: !isSignup ? '' : undefined,
    confirmPassword: '',
    email: initValues['email'] || '',
    role: initValues['role'] || Role.Doctor,
  });
  const roleData = [
    { label: 'Doctor', value: Role.Doctor },
    { label: 'Technician', value: Role.Technician },
    { label: 'Admin', value: Role.Admin },
  ];

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
          setFieldValue,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.wrapper}>
            <View style={styles.singleFormFieldWrapper}>
              <TextInput
                placeholder='Name'
                style={styles.textInput}
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              <ErrorText errors={errors} touched={touched} name='name' />
            </View>
            <View style={styles.singleFormFieldWrapper}>
              <TextInput
                placeholder='Email'
                style={styles.textInput}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                editable={isSignup}
              />
              <ErrorText errors={errors} touched={touched} name='email' />
            </View>

            {!isSignup ? (
              <View style={styles.singleFormFieldWrapper}>
                <TextInput
                  placeholder='New Password'
                  style={styles.textInput}
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  secureTextEntry={true}
                />
                <ErrorText
                  errors={errors}
                  touched={touched}
                  name='newPassword'
                />
              </View>
            ) : (
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
            )}
            <View style={styles.singleFormFieldWrapper}>
              <TextInput
                placeholder='Confirm password'
                style={styles.textInput}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry={true}
              />
              <ErrorText
                errors={errors}
                touched={touched}
                name='confirmPassword'
              />
            </View>
            <View style={styles.singleFormFieldWrapper}>
              <Dropdown
                placeholder='Role'
                style={styles.textInput}
                value={values.role}
                data={roleData}
                enabled={isSignup}
                onChange={(value) => setFieldValue('role', value)}
              />
            </View>

            <View style={styles.signUpButtonWrapper}>
              <FlatButton
                title={isSignup ? 'Sign Up' : 'Update User'}
                onPress={handleSubmit}
              />
            </View>
            {isSignup ? (
              <View style={styles.loginButtonWrapper}>
                <FlatButton
                  style={styles.loginButton}
                  title='Login'
                  onPress={() => navigation.navigate(routes.UserSignIn)}
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
    paddingTop: 30,
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
  signUpButtonWrapper: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingRight: 10,
  },

  loginButtonWrapper: {
    alignSelf: 'center',
    margin: 25,
  },
  loginButton: {
    width: 150,
  },
});
export default UserProfileForm;
