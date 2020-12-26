import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FlatButton from '../button/FlatButton';
import { FormTextInput } from '../forms/FormComponents';
const TransportStatusItem = ({
  initValue,
  onSave,
  loading,
  disableButtons,
}) => {
  const ValidationSchema = Yup.object({
    status: Yup.string(),
  });
  const onPickupAddrSubmit = (values) => {
    onSave(values.status);
  };
  const getInitValues = () => ({ status: initValue || '' });
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
          <FormTextInput
            placeholder={'Status'}
            name='status'
            value={values.status}
            onChangeText={handleChange('status')}
            onBlur={handleBlur('status')}
          />
          <View style={styles.submitButtonWrapper}>
            <FlatButton
              style={{ width: 100 }}
              textStyle={{ fontSize: 15 }}
              onPress={handleSubmit}
              title={'Update'}
              loading={loading}
              disable={disableButtons}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  wrapper: { paddingHorizontal: 15 },
  submitButtonWrapper: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingRight: 10,
  },
});
export default TransportStatusItem;
