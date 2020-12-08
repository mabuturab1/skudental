import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { Dropdown, FlatButton, ScrollWrapper } from '../../components';
import { routes } from '../../constants/routes';
import { Role } from '../../constants/UIConstants';
import { ThemeColors } from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import { userSignup } from '../../store/actions';

const UserSignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const ValidationSchema = Yup.object({
    name: Yup.string().required('Kindly enter your name'),
    email: Yup.string()
      .trim()
      .email('Kindly enter a valid email')
      .required('Kindly enter your email'),
    password: Yup.string()
      .min(5, 'Password should be atleast 5 characters')
      .required('Kindly enter a valid password'),
    confirmPassword: Yup.string()
      .min(5, 'Password should be atleast 5 characters')
      .required('Kindly enter a valid password'),
    role: Yup.number().required('Kindly select a role'),
  });
  const getCurrentDate = () => moment().format('dd MM YYYY hh:mm:ss');
  const onSignupSubmit = (values) => {
    delete values.confirmPassword;
    values = { ...values, email: values.email.trim().toLowerCase() };
    dispatch(userSignup(values, (isSuccess) => {}));
  };
  const getInitValues = () => ({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: Role.Doctor,
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
          onSignupSubmit(values);
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          values,
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
            </View>
            <View style={styles.singleFormFieldWrapper}>
              <TextInput
                placeholder='Email'
                style={styles.textInput}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
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
            </View>
            <View style={styles.singleFormFieldWrapper}>
              <TextInput
                placeholder='Confirm password'
                style={styles.textInput}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.singleFormFieldWrapper}>
              <Dropdown
                placeholder='Role'
                style={styles.textInput}
                value={values.role}
                data={roleData}
                onChange={(value) => setFieldValue('role', value)}
              />
            </View>

            <View style={styles.signUpButtonWrapper}>
              <FlatButton title='Sign Up' onPress={handleSubmit} />
            </View>
            <View style={styles.loginButtonWrapper}>
              <FlatButton
                style={styles.loginButton}
                title='Login'
                onPress={() => navigation.navigate(routes.UserSignIn)}
              />
            </View>
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
export default UserSignUpScreen;
