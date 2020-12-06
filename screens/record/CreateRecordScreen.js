import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { ThemeColors } from '../../constants/Colors';
import {
  FlatButton,
  RoundedButton,
  RounedImageList,
  ScrollWrapper,
} from '../../components';
import ImagePicker from 'react-native-image-crop-picker';
import { Ionicons } from '@expo/vector-icons';
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
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      console.log('images', images[0].path);
      setImages(images);
    });
  };
  const imageSelect = (imageList) => {
    setImages(imageList);
  };
  return (
    <ScrollWrapper>
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
              <Text style={styles.textLabel}>Submission Date</Text>
              <TextInput
                style={styles.textInput}
                name='submissionDate'
                value={values.submissionDate}
                editable={false}
              />
            </View>
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

            <View style={styles.imageContainer}>
              <View style={styles.imageList}>
                <RounedImageList imageList={images} maxImages={2} />
              </View>
              <View style={styles.imagePicker}>
                <RoundedButton
                  icon={<Ionicons name='images' size={24} color='white' />}
                  onPress={getPhotos}
                />
              </View>
            </View>
            <View style={styles.submitButtonWrapper}>
              <FlatButton onPress={handleSubmit} title='Submit' />
            </View>
          </View>
        )}
      </Formik>
    </ScrollWrapper>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
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
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingRight: 10,
  },
  imageList: {
    flex: 1,
  },
  imagePicker: {
    width: 50,
    marginLeft: 10,
  },
  submitButtonWrapper: {
    alignSelf: 'center',
    marginTop: 20,
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
