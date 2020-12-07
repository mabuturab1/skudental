import React from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ThemeColors } from '../../constants/Colors';
import { FlatButton } from '../../components';
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
        <View style={styles.wrapper}>
          <TextInput
            placeholder={'Pickup Address'}
            style={styles.textInput}
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
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    paddingTop: 30,
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
  submitButtonWrapper: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingRight: 10,
  },
});
export default ArrangePickeupScreen;
