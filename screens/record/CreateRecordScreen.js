import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import {
  ErrorText,
  FormTextInput,
  FormWrapper,
  FormInputWrapper,
  RoundedButton,
  RounedImageList,
  ScrollWrapper,
} from '../../components';
import ImagePicker from 'react-native-image-crop-picker';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { routes } from '../../constants/routes';
import {
  clearUploadedRecord,
  updateCurrentRecord,
} from '../../store/record/actions';
import { useDispatch, useSelector } from 'react-redux';
import { isAndroid } from '../../helpers/Utils';
const CreateRecordScreen = ({ navigation }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const currentRecord = useSelector(({ record }) => record.currentRecord);
  const recordData = currentRecord.recordData || {};
  useEffect(() => {
    dispatch(clearUploadedRecord());
  }, [dispatch]);
  const ValidationSchema = Yup.object({
    patientName: Yup.string().trim().required('Kindly enter a patient name'),
    additionalNotes: Yup.string(),
  });
  const getAttachedImages = (record) => {
    let updatedImages = [];
    if (record.attachedPosts) {
      updatedImages = record.attachedPosts.map((el) => ({
        ...el.imageFile,
        path: el.path,
      }));
    }
    return updatedImages;
  };
  const [images, setImages] = useState(getAttachedImages(currentRecord));
  const getCurrentDate = () => moment().format('dd MM YYYY hh:mm:ss');
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     if (formikRef.current) {
  //       formikRef.current.resetForm();
  //     }
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation, formikRef]);
  const onCreateRecordSubmit = (values) => {
    navigation.navigate(routes.HomeFeed);
  };
  const showPreviewOfRecord = () => {
    navigation.navigate(routes.PreviewRecord, {
      showCurrentReduxRecord: true,
      editMode: true,
    });
  };
  const getInitValues = () => ({
    submissionDate: getCurrentDate(),
    patientName: recordData.patientName || '',
    additionalNotes: recordData.additionalNotes || '',
  });
  const getPhotos = (values) => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((selectedImages) => {
        setImages(selectedImages);
        const postItems = selectedImages.map((el) => ({
          _id: uuidv4(),
          imageUrl: el.path,
          imageFile: el,
          additionalComments: '',
          audioItem: null,
          uploadComplete: false,
          recordUpdateFailed: false,
          progress: 0,
        }));
        const newRecord = {
          _id: uuidv4(),
          recordData: values,
          attachedPosts: postItems,
        };
        dispatch(updateCurrentRecord(newRecord));
        navigation.navigate(routes.PreviewCarousel, newRecord);
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
              <View>
                <TouchableOpacity onPress={showPreviewOfRecord}>
                  <View>
                    <FontAwesome name={'edit'} size={24} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <RoundedButton
              disabled={errors.patientName}
              icon={<Ionicons name='images' size={24} color='white' />}
              onPress={handleSubmit}
            />
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
