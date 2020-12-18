import React, { Fragment } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Dropdown from '../dropdown/Dropdown';
import FlatButton from '../button/FlatButton';
import ScrollWrapper from '../scrollWrapper/ScrollWrapper';
import { routes } from '../../constants/routes';
import { Role } from '../../constants/UIConstants';
import { ThemeColors } from '../../constants/Colors';
import ErrorText from './ErrorText';
import { FormInputWrapper, FormTextInput, FormWrapper } from './FormComponents';

const UserProfileForm = ({
  navigation,
  initValues = {},
  onSubmit,
  isSignup = true,
  loading = false,
}) => {
  const getValidationSchema = () => {
    const signupObj = {
      password: Yup.string()
        .min(6, 'Password should be atleast 6 characters')
        .required('Kindly enter a valid password'),
    };
    const updateUserObj = {
      currentPassword: Yup.string()
        .min(6, 'Password should be atleast 6 characters')
        .required('Kindly enter a valid password'),
      newPassword: Yup.string()
        .min(6, 'Password should be atleast 5 characters')
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
        .required('Kindly enter a valid password')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
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
          <FormWrapper>
            <FormInputWrapper style={styles.singleFormFieldWrapper}>
              <FormTextInput
                placeholder='Name'
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              <ErrorText errors={errors} touched={touched} name='name' />
            </FormInputWrapper>
            <FormInputWrapper style={styles.singleFormFieldWrapper}>
              <FormTextInput
                placeholder='Email'
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                editable={isSignup}
              />
              <ErrorText errors={errors} touched={touched} name='email' />
            </FormInputWrapper>

            {!isSignup ? (
              <FormInputWrapper style={styles.singleFormFieldWrapper}>
                <FormTextInput
                  placeholder='New Password'
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
              </FormInputWrapper>
            ) : (
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
            )}
            <FormInputWrapper style={styles.singleFormFieldWrapper}>
              <FormTextInput
                placeholder='Confirm password'
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
            </FormInputWrapper>

            <FlatButton
              loading={loading}
              style={styles.signupButton}
              title={isSignup ? 'Sign Up' : 'Update User'}
              onPress={handleSubmit}
            />

            {isSignup ? (
              <View style={styles.loginButtonWrapper}>
                <Text style={styles.loginButtonText}>
                  Already have an account?
                </Text>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate(routes.UserSignIn)}
                >
                  <Text style={styles.signinText}>Sign In</Text>
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
  signupButton: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginButtonWrapper: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontFamily: 'RobotoLight',
  },
  signinText: {
    fontFamily: 'RobotoRegular',
    color: ThemeColors.primary,
    paddingLeft: 5,
  },
});
export default UserProfileForm;
