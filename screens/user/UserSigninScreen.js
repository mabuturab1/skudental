import React from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TouchableHighlight } from 'react-native-gesture-handler';
import moment from 'moment';
import { ThemeColors } from '../../constants/Colors';
import { FlatButton, LogoBox } from '../../components';
import { routes } from '../../constants/routes';
const UserSignInScreen = (props) => {
  const ValidationSchema = Yup.object({
    email: Yup.string().email().required('Kindly enter your email'),
    password: Yup.string()
      .min(5, 'Password should be atleast 5 characters')
      .required('Kindly enter a valid password'),
  });
  const getCurrentDate = () => moment().format('dd MM YYYY hh:mm:ss');
  const onCreateRecordSubmit = (values) => {};
  const getInitValues = () => ({ email: '', password: '' });

  return (
    <Formik
      initialValues={getInitValues()}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        onCreateRecordSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.wrapper}>
          <LogoBox />
          <View style={styles.singleFormFieldWrapper}>
            <Text style={styles.textLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              name='email'
              value={values.email}
            />
          </View>
          <View style={styles.singleFormFieldWrapper}>
            <Text style={styles.textLabel}>Password</Text>
            <TextInput
              style={styles.textInput}
              name='password'
              value={values.password}
            />
          </View>
          <View style={styles.loginButtonWrapper}>
            <FlatButton title='Login' onPress={handleSubmit} />
          </View>
          <View style={styles.registerButtonWrapper}>
            <FlatButton
              style={styles.registerButton}
              title='Register'
              onPress={() => props.navigation.navigate(routes.UserSignUp)}
            />
          </View>
        </View>
      )}
    </Formik>
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
    borderBottomColor: '#ccc',
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
