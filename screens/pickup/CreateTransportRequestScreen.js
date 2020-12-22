import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  ErrorText,
  FlatButton,
  FormInputWrapper,
  FormTextInput,
  FormWrapper,
  ScrollWrapper,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { createTransportRequest } from '../../store/actions';
const CreateTransportRequestScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const createTransportLoading = useSelector(
    ({ transport }) => transport.loading.createTransportRequest
  );
  const ValidationSchema = Yup.object({
    address: Yup.string().required('Kindly enter an address'),
    postalCode: Yup.string().required('Kindly enter your postal Code'),
    city: Yup.string().required('Kindly enter your city'),
    state: Yup.string(),
    country: Yup.string().required('Kindly enter your country'),
  });
  const onSubmit = (values) => {
    console.log('dispatching request');
    dispatch(
      createTransportRequest(values, (isSuccess) => {
        console.log('is request success', isSuccess);
        if (isSuccess) {
          navigation.goBack();
        }
      })
    );
  };
  const getInitValues = () => ({
    address: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
  });
  return (
    <ScrollWrapper>
      <Formik
        initialValues={getInitValues()}
        validationSchema={ValidationSchema}
        onSubmit={(values) => {
          onSubmit(values);
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
            <FormInputWrapper>
              <FormTextInput
                placeholder={'Address'}
                name='address'
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                multiline={true}
                numberOfLines={4}
              />
              <ErrorText errors={errors} touched={touched} name='address' />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                placeholder={'Postal Code'}
                name='postalCode'
                value={values.postalCode}
                onChangeText={handleChange('postalCode')}
                onBlur={handleBlur('postalCode')}
              />
              <ErrorText errors={errors} touched={touched} name='postalCode' />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                placeholder={'City'}
                name='city'
                value={values.city}
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
              />
              <ErrorText errors={errors} touched={touched} name='city' />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                placeholder={'State'}
                name='state'
                value={values.state}
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
              />
              <ErrorText errors={errors} touched={touched} name='state' />
            </FormInputWrapper>
            <FormInputWrapper>
              <FormTextInput
                placeholder={'Country'}
                name='country'
                value={values.country}
                onChangeText={handleChange('country')}
                onBlur={handleBlur('country')}
              />
            </FormInputWrapper>
            <ErrorText errors={errors} touched={touched} name='country' />
            <View style={styles.submitButtonWrapper}>
              <FlatButton
                style={{ width: '100%' }}
                onPress={handleSubmit}
                title={'Submit'}
                loading={createTransportLoading}
              />
            </View>
          </FormWrapper>
        )}
      </Formik>
    </ScrollWrapper>
  );
};
const styles = StyleSheet.create({
  submitButtonWrapper: {
    alignSelf: 'flex-end',
    width: '100%',
    marginTop: 40,
  },
});
export default CreateTransportRequestScreen;
