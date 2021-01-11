import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import {
  ErrorText,
  FormTextInput,
  FormWrapper,
  FormInputWrapper,
  RoundedButton,
  RounedImageList,
  ScrollWrapper,
  FlatButton,
} from '../../components';
import ImagePicker from 'react-native-image-crop-picker';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { routes } from '../../constants/routes';
import {
  clearUploadedRecord,
  startUploadingData,
  updateCurrentRecord,
} from '../../store/record/actions';
import { useDispatch, useSelector } from 'react-redux';
const CreateRecordScreen = ({ navigation }) => {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const { currentRecord, uploadingDataArr = [] } = useSelector(
    ({ record }) => ({
      currentRecord: record.currentRecord,
      uploadingDataArr: record.uploadingDataArr,
    })
  );
  const recordData = currentRecord.recordData || {};
  useEffect(() => {
    dispatch(clearUploadedRecord());
  }, [dispatch]);

  const ValidationSchema = Yup.object({
    patientName: Yup.string().trim().required('Kindly enter a patient name'),
    additionalNotes: Yup.string(),
  });
  const getAttachedImages = useCallback((record) => {
    let updatedImages = [];
    if (record.attachedPosts) {
      updatedImages = record.attachedPosts.map((el) => ({
        ...el.imageFile,
        path: el.imageUrl,
      }));
    }
    return updatedImages;
  }, []);
  const [images, setImages] = useState(getAttachedImages(currentRecord));
  useEffect(() => {
    setImages(getAttachedImages(currentRecord));
  }, [currentRecord, getAttachedImages]);

  const getCurrentDate = () => moment().format('dd MM YYYY hh:mm:ss');

  const onCreateRecordSubmit = (values) => {
    navigation.navigate(routes.HomeFeed);
  };
  const showPreviewOfRecord = () => {
    navigation.navigate(routes.PreviewRecord, {
      isCurrentReduxRecord: true,
      editMode: true,
    });
  };
  const getInitValues = () => ({
    submissionDate: getCurrentDate(),
    patientName: recordData.patientName || '',
    additionalNotes: recordData.additionalNotes || '',
    access: recordData.access || { isPublic: false },
  });
  const getPhotos = (values) => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then((selectedImages) => {
        setImages(selectedImages);
        const postItems = selectedImages.map((el) => ({
          imageUrl: el.path,
          imageFile: {
            ...el,
            name: el.path?.split('/')?.pop()
              ? Date.now().toString() + el.path?.split('/').pop()
              : Date.now().toString() + el.mime,
          },
          additionalComments: '',
          audioItem: null,
          uploadComplete: false,
          recordUpdateFailed: false,
          progress: 0,
        }));
        const newRecord = {
          recordData: values,
          attachedPosts: postItems,
        };
        dispatch(updateCurrentRecord(newRecord));
        navigation.navigate(routes.PreviewCarousel);
      })
      .catch((error) => {
        console.log('error in file selection', error);
      });
  };
  const onSubmitRecord = () => {
    dispatch(startUploadingData(currentRecord, uploadingDataArr.length));
    if (formikRef.current) formikRef.current.resetForm();
    dispatch(updateCurrentRecord({ recordData: {}, attachedPosts: [] }));
    navigation.navigate(routes.PreviewRecord, {
      currentRecordIndex: uploadingDataArr.length,
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
          setFieldValue,
          setFieldTouched,
        }) => (
          <FormWrapper style={styles.wrapper}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setFieldValue('access', { isPublic: !values.access.isPublic })
              }
            >
              <View style={styles.statusSet}>
                <Text style={styles.statusLabel}>Visibility Status:</Text>
                <Text style={styles.statusValue}>
                  {values?.access?.isPublic
                    ? 'Post to dentogram'
                    : 'Post to lab'}
                </Text>
                <MaterialIcons
                  size={24}
                  name={values?.access?.isPublic ? 'public' : 'public-off'}
                />
              </View>
            </TouchableOpacity>
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
                <View>
                  {images.length ? (
                    <TouchableOpacity onPress={showPreviewOfRecord}>
                      <FontAwesome name={'edit'} size={24} />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
            <View style={styles.attachePhotoButtonWrapper}>
              <RoundedButton
                icon={<Ionicons name='images' size={24} color='white' />}
                onPress={handleSubmit}
              />
            </View>
            <View style={styles.submitButtonWrapper}>
              <FlatButton
                disabled={images.length < 1}
                title={'Submit'}
                onPress={onSubmitRecord}
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
    alignItems: 'center',
    marginTop: 20,
    paddingRight: 10,
  },
  statusSet: { flexDirection: 'row' },
  statusLabel: { fontSize: 14, fontFamily: 'RalewayBold', marginRight: 10 },
  statusValue: { fontSize: 14, fontFamily: 'RalewaySemiBold', marginRight: 5 },
  imageList: {
    flex: 1,
  },
  imagePicker: {
    width: 50,
    marginLeft: 10,
  },
  submitButtonWrapper: {
    width: 100,
    marginVertical: 20,
    paddingRight: 10,
    alignSelf: 'center',
  },
  attachePhotoButtonWrapper: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
});
export default CreateRecordScreen;
