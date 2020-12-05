import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TouchableHighlight } from 'react-native-gesture-handler';
import moment from 'moment';
import Constants from 'expo-constants';
import { ThemeColors } from '../../constants/Colors';
import { Dropdown, FlatButton } from '../../components';
import { routes } from '../../constants/routes';
const UserSignUpScreen = (props) => {
  const ValidationSchema = Yup.object({
    name: Yup.string().required('Kindly enter your name'),
    email: Yup.string()
      .email('Kindly enter a valid email')
      .required('Kindly enter your email'),
    password: Yup.string()
      .min(5, 'Password should be atleast 5 characters')
      .required('Kindly enter a valid password'),
    confirmPassword: Yup.string()
      .min(5, 'Password should be atleast 5 characters')
      .required('Kindly enter a valid password'),
    role: Yup.string().required('Kindly select a role'),
  });
  const getCurrentDate = () => moment().format('dd MM YYYY hh:mm:ss');
  const onCreateRecordSubmit = (values) => {};
  const getInitValues = () => ({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: '',
  });
  const roleData = [
    { label: 'Doctor', value: 'Doctor' },
    { label: 'Technician', value: 'Technician' },
    { label: 'Admin', value: 'Admin' },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Formik
          initialValues={getInitValues()}
          validationSchema={ValidationSchema}
          onSubmit={(values) => {
            onCreateRecordSubmit(values);
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
                <Text style={styles.textLabel}>Name</Text>
                <TextInput
                  style={styles.textInput}
                  name='name'
                  value={values.name}
                />
              </View>
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
              <View style={styles.singleFormFieldWrapper}>
                <Text style={styles.textLabel}>Confirm Password</Text>
                <TextInput
                  style={styles.textInput}
                  name='confirmPassword'
                  value={values.confirmPassword}
                />
              </View>
              <View style={styles.singleFormFieldWrapper}>
                <Text style={styles.textLabel}>Role</Text>
                <Dropdown
                  style={styles.textInput}
                  name='role'
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
                  onPress={() => props.navigation.navigate(routes.UserSignIn)}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
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
