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
    practiceName: Yup.string().required('Kindly enter an practiceName'),
  });
  const onSubmit = (values) => {
    dispatch(
      createTransportRequest(values, (isSuccess) => {
        if (isSuccess) {
          navigation.goBack();
        }
      })
    );
  };
  const getInitValues = () => ({
    practiceName:''
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
                placeholder={'Pratice Name'}
                name='practiceName'
                value={values.practiceName}
                onChangeText={handleChange('practiceName')}
                onBlur={handleBlur('practiceName')}
                multiline={true}
                numberOfLines={4}
              />
              <ErrorText errors={errors} touched={touched} name='practiceName' />
            </FormInputWrapper>
          
          
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
