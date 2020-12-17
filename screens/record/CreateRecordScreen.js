import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { ThemeColors } from '../../constants/Colors';
import {
  ErrorText,
  FlatButton,
  FormTextInput,
  FormWrapper,
  FormInputWrapper,
  RoundedButton,
  RounedImageList,
  ScrollWrapper,
} from '../../components';
import ImagePicker from 'react-native-image-crop-picker';
import { Ionicons } from '@expo/vector-icons';
import { routes } from '../../constants/routes';
import { clearUploadedRecord } from '../../store/record/actions';
import { useDispatch } from 'react-redux';
const CreateRecordScreen = ({ navigation }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearUploadedRecord());
  }, [dispatch]);
  const ValidationSchema = Yup.object({
    patientName: Yup.string().trim().required('Kindly enter a patient name'),
    additionalNotes: Yup.string(),
  });

  const [images, setImages] = useState([]);
  const getCurrentDate = () => moment().format('dd MM YYYY hh:mm:ss');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (formikRef.current) {
        formikRef.current.resetForm();
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, formikRef]);
  const onCreateRecordSubmit = (values) => {
    navigation.navigate(routes.HomeFeed);
  };
  const getInitValues = () => ({
    submissionDate: getCurrentDate(),
    patientName: '',
    additionalNotes: '',
  });
  const getPhotos = (values) => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((selectedImages) => {
        setImages(selectedImages);
        const imageList = selectedImages.map((el) => ({
          imageUrl: el.path,
          imageFile: el,
          additionalComments: '',
          audioItem: null,
          uploadComplete: false,
          recordUpdateFailed: false,
          progress: 0,
        }));
        navigation.navigate(routes.PreviewCarousel, {
          recordData: values,
          carouselItems: imageList,
        });
      })
      .catch((error) => {
        console.log('error in file selection', error);
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
        innerRef={formikRef}
        onSubmit={(values) => {
          getPhotos(values);
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
            <FormInputWrapper style={styles.singleFormFieldWrapper}>
              <FormTextInput
                name='submissionDate'
                value={values.submissionDate}
                editable={false}
              />
            </FormInputWrapper>
            <FormInputWrapper style={styles.singleFormFieldWrapper}>
              <FormTextInput
                placeholder='Patient Name'
                value={values.patientName}
                onChangeText={handleChange('patientName')}
                onBlur={handleBlur('patientName')}
              />
              <ErrorText errors={errors} touched={touched} name='patientName' />
            </FormInputWrapper>
            <FormInputWrapper style={styles.singleFormFieldWrapper}>
              <FormTextInput
                placeholder={'Additional Notes'}
                multiline={true}
                numberOfLines={4}
                value={values.additionalNotes}
                onChangeText={handleChange('additionalNotes')}
                onBlur={handleBlur('additionalNotes')}
              />
              <ErrorText
                errors={errors}
                touched={touched}
                name='additionalNotes'
              />
            </FormInputWrapper>

            <View style={styles.imageContainer}>
              <View style={styles.imageList}>
                <RounedImageList imageList={images} maxImages={2} />
              </View>

              <RoundedButton
                disabled={errors.patientName}
                icon={<Ionicons name='images' size={24} color='white' />}
                onPress={handleSubmit}
              />
            </View>
            {/* <View style={styles.submitButtonWrapper}>
              <FlatButton onPress={handleSubmit} title='Submit' />
            </View> */}
          </FormWrapper>
        )}
      </Formik>
    </ScrollWrapper>
  );
};
const styles = StyleSheet.create({
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
});
export default CreateRecordScreen;
