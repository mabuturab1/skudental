import React from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ThemeColors } from '../../constants/Colors';
import { FlatButton, FormTextInput, FormWrapper } from '../../components';
const ArrangePickeupScreen = (props) => {
  const ValidationSchema = Yup.object({
    pickupAddress: Yup.string().required('Kindly enter a pickup address'),
  });
  const onPickupAddrSubmit = (values) => {};
  const getInitValues = () => ({ pickupAddress: '' });
  return (
    <Formik
      initialValues={getInitValues()}
      validationSchema={ValidationSchema}
      onSubmit={(values) => {
        onPickupAddrSubmit(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <FormWrapper style={styles.wrapper}>
          <FormTextInput
            placeholder={'Pickup Address'}
            name='pickupAddress'
            value={values.pickupAddress}
            onChange={handleChange('pickupAddress')}
            onBlur={handleBlur('pickupAddress')}
            multiline={true}
            numberOfLines={4}
          />
          <View style={styles.submitButtonWrapper}>
            <FlatButton onPress={handleSubmit} title={'Submit'} />
          </View>
        </FormWrapper>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  submitButtonWrapper: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingRight: 10,
  },
});
export default ArrangePickeupScreen;
