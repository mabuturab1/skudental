import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { ThemeColors } from '../../constants/Colors';
import { FlatButton } from '../../components';
import { routes } from '../../constants/routes';
const CreateRecordScreen = (props) => {
  const ValidationSchema = Yup.object({
    pickupAddress: Yup.string().required('Kindly enter a pickup address'),
  });
  const [images, setImages] = useState([]);
  const getCurrentDate = () => moment().format('dd MM YYYY hh:mm:ss');
  const onCreateRecordSubmit = (values) => {};
  const getInitValues = () => ({
    submissionDate: getCurrentDate(),
    patientName: '',
    additionalNotes: '',
  });
  const getPhotos = () => {
    props.navigation.navigate(routes.ImagePicker);
  };
  const imageSelect = (imageList) => {
    setImages(imageList);
  };
  console.log('image list is', images);
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
          <View style={styles.singleFormFieldWrapper}>
            <Text style={styles.textLabel}>Patient Name</Text>
            <TextInput
              style={styles.textInput}
              value={values.patientName}
              onChange={handleChange('patientName')}
              onBlur={handleBlur('patientName')}
            />
          </View>
          <View style={styles.singleFormFieldWrapper}>
            <Text style={styles.textLabel}>Additional Notes</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.textInput}
              value={values.additionalNotes}
              onChange={handleChange('additionalNotes')}
              onBlur={handleBlur('additionalNotes')}
            />
          </View>
          <View style={styles.singleFormFieldWrapper}>
            <Text style={styles.textLabel}>Submission Date</Text>
            <TextInput
              style={styles.textInput}
              name='submissionDate'
              value={values.submissionDate}
              editable={false}
            />
          </View>
          <View style={styles.submitButtonWrapper}>
            <FlatButton onPress={getPhotos} title='Select Photos' />
          </View>
          <View style={styles.submitButtonWrapper}>
            <FlatButton onPress={handleSubmit} title='Submit' />
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
  submitButtonWrapper: {
    alignSelf: 'flex-end',
    marginTop: 10,
    paddingRight: 10,
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
export default CreateRecordScreen;
