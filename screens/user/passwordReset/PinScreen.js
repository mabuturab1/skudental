import React from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { routes } from '../../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
// import { confirmPin } from '../../../store/actions';
import {
  FormTextInput,
  FormWrapper,
  FormInputWrapper,
  FlatButton,
  LogoBox,
  ScrollWrapper,
  ErrorText,
} from '../../../components';
const PinScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const email = useSelector(({ auth }) => auth.user.email);
  const ValidationSchema = Yup.object({
    pin: Yup.number().required('Kindly enter your pin'),
  });
  const onForgotPassword = (values) => {
    // dispatch(
    //   confirmPin(
    //     { ...values, email: email?.trim()?.toLowerCase() },
    //     (isSuccess) => {
    //       if (isSuccess) {
    //         navigation.navigate(routes.PasswordReset);
    //       }
    //     }
    //   )
    // );
  };
  const getInitValues = () => ({ pin: '' });

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
                placeholder='Pin Number'
                value={values.pin}
                onChangeText={handleChange('pin')}
                onBlur={handleBlur('pin')}
              />
              <ErrorText errors={errors} touched={touched} name='pin' />
            </FormInputWrapper>
            <View style={styles.verifyButtonWrapper}>
              <FlatButton title={'Verify'} onPress={handleSubmit} />
            </View>
          </FormWrapper>
        )}
      </Formik>
    </ScrollWrapper>
  );
};
const styles = StyleSheet.create({
  verifyButtonWrapper: {
    alignSelf: 'flex-end',
    margin: 10,
  },
});
export default PinScreen;
