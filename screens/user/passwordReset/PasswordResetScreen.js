import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { routes } from '../../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store/actions';
import {
  FormInputWrapper,
  FormTextInput,
  FormWrapper,
  FlatButton,
  LogoBox,
  ScrollWrapper,
  ErrorText,
} from '../../../components';
const PasswordResetScreen = ({ navigation }) => {
  const email = useSelector(({ auth }) => auth.user.email);
  const dispatch = useDispatch();
  const ValidationSchema = Yup.object({
    password: Yup.string()
      .min(5, 'Password should be atleast 5 characters')
      .required('Kindly enter a valid password'),
    confirmPassword: Yup.string()
      .min(5, 'Password should be atleast 5 characters')
      .required('Kindly enter a valid password'),
  });
  const verifyScuccess = (isSuccess) => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: routes.UserSignIn }],
      });
    }
  };
  const onUpdatePassword = (values) => {
    delete values.confirmPassword;
    let updatedValues = { ...values, email };
    dispatch(updateUser(updatedValues, verifyScuccess, true));
  };
  const getInitValues = () => ({ password: '', confirmPassword: '' });

  return (
    <ScrollWrapper>
      <Formik
        initialValues={getInitValues()}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onUpdatePassword(values);
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
                placeholder='Password'
                value={values.email}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <ErrorText errors={errors} touched={touched} name='password' />
            </FormInputWrapper>
            <FormInputWrapper style={styles.singleFormFieldWrapper}>
              <FormTextInput
                placeholder='Confirm Password'
                value={values.password}
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
            <View style={styles.updatePasswordWrapper}>
              <FlatButton title={'Update Password'} onPress={handleSubmit} />
            </View>
          </FormWrapper>
        )}
      </Formik>
    </ScrollWrapper>
  );
};
const styles = StyleSheet.create({
  updatePasswordWrapper: {
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
export default PasswordResetScreen;
