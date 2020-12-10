import React from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { routes } from '../../../constants/routes';
import { useDispatch } from 'react-redux';
import { firebaseResetPassword } from '../../../store/actions';
import {
  FormTextInput,
  FormWrapper,
  FormInputWrapper,
  FlatButton,
  LogoBox,
  ScrollWrapper,
  ErrorText,
} from '../../../components';
const EmailScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const ValidationSchema = Yup.object({
    email: Yup.string().email().trim().required('Kindly enter your email'),
  });
  const onForgotPassword = (values) => {
    dispatch(
      firebaseResetPassword(
        { email: values.email.trim().toLowerCase() },
        (isSuccess) => {
          if (isSuccess) navigation.navigate(routes.UserSignIn);
        }
      )
    );
  };
  const getInitValues = () => ({ email: '' });

  return (
    <ScrollWrapper>
      <Formik
        initialValues={getInitValues()}
        validationSchema={ValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onForgotPassword(values);
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
              />
              <ErrorText errors={errors} touched={touched} name='email' />
            </FormInputWrapper>
            <View style={styles.nextButtonWrapper}>
              <FlatButton title={'Next'} onPress={handleSubmit} />
            </View>
          </FormWrapper>
        )}
      </Formik>
    </ScrollWrapper>
  );
};
const styles = StyleSheet.create({
  nextButtonWrapper: {
    alignSelf: 'flex-end',
    margin: 10,
  },
});
export default EmailScreen;
