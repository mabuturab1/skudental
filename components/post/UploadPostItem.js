import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgressbar from '../progressbar/CircularProgressbar';
import { ThemeColors } from '../../constants/Colors';
import { routes } from '../../constants/routes';
import { isAndroid } from '../../helpers/Utils';
import { uploadRecordPhoto } from '../../store/record/actions';
const UploadPostItem = ({
  imageObj,
  navigation,
  currentRecordIndex,
  itemIndex,
}) => {
  const dispatch = useDispatch();
  const [sendToServer, setSendToServerStatus] = useState(false);
  const uploadingDataArr = useSelector(({ record }) => record.uploadingDataArr);
  useEffect(() => {}, []);
  const showImagePreview = () => {
    navigation.navigate(routes.ImagePreview, {
      imageObj,
    });
  };
  const reUploadData = () => {
    try {
      const record = uploadingDataArr[currentRecordIndex].recordData;
      dispatch(
        uploadRecordPhoto(
          record._id,
          imageObj,
          currentRecordIndex,
          itemIndex,
          (isSuccess) => {}
        )
      );
    } catch (error) {}
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconWrapper}>
        {imageObj.additionalComments != null ? (
          <Text style={styles.commentsText}>{imageObj.additionalComments}</Text>
        ) : null}

        <View style={styles.singleIconWrapper}>
          <MaterialIcons name={'delete'} size={24} color='black' />
        </View>
      </View>

      <TouchableWithoutFeedback onPress={showImagePreview}>
        <View style={styles.coverPhotoWrapper}>
          <Image
            style={styles.coverPhoto}
            source={{ uri: imageObj.imagePath }}
          />
          <View style={styles.postAudioWrapper}>
            <PostAudio itemIndex={itemIndex} isServerFile={false} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.iconWrapper}>
        <View></View>
        <View style={styles.singleIconWrapper}>
          {imageObj.recordUpdateFailed ? (
            <TouchableOpacity onPress={reUploadData}>
              <Ionicons
                name={isAndroid() ? 'md-checkmark-done' : 'ios-checkmark-done'}
                color={ThemeColors.primary}
                size={24}
              />
            </TouchableOpacity>
          ) : imageObj.progress != null && !imageObj.uploadComplete ? (
            <CircularProgressbar progress={imageObj.progress} />
          ) : (
            <Ionicons
              name={isAndroid() ? 'md-checkmark-done' : 'ios-checkmark-done'}
              color={ThemeColors.primary}
              size={24}
            />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 500,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginVertical: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  singleIconWrapper: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  coverPhoto: {
    width: Dimensions.get('window').width,
    height: 420,
    resizeMode: 'cover',
  },
  coverPhotoWrapper: {
    position: 'relative',
  },
  commentsText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  postAudioWrapper: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});
export default UploadPostItem;
