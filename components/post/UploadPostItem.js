import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import ViewMoreText from '../viewMoreText/ViewMoreText';
import { ThemeColors } from '../../constants/Colors';
import { routes } from '../../constants/routes';
import { isValidValue } from '../../helpers/Utils';
import { uploadRecordPhoto } from '../../store/record/actions';
import AudioPlayer from '../audio/AudioPlayer';
import ProgressUploadStatus from '../progressUploadStatus/ProgressUploadStatus';
const UploadPostItem = ({
  postObj,
  navigation,
  currentRecordIndex,
  itemIndex,
  isServerRecord = true,
  isCurrentReduxRecord,
  deleteItem = () => {},
}) => {
  const dispatch = useDispatch();
  const uploadingDataArr = useSelector(({ record }) => record.uploadingDataArr);

  useEffect(() => {}, []);
  const showImagePreview = () => {
    navigation.navigate(routes.ImagePreview, {
      postObj,
      currentRecordIndex,
      isServerRecord,
      itemIndex,
      isCurrentReduxRecord,
    });
  };
  const reUploadData = () => {
    try {
      const record = uploadingDataArr[currentRecordIndex].recordData;
      dispatch(
        uploadRecordPhoto(
          record._id,
          postObj,
          currentRecordIndex,
          itemIndex,
          (isSuccess) => {}
        )
      );
    } catch (error) {}
  };

  const isFileUploading = () =>
    !isCurrentReduxRecord &&
    postObj.progress != null &&
    !postObj.uploadComplete;
  return (
    <View style={styles.wrapper}>
      <View style={{ ...styles.iconWrapper, ...styles.smallPadding }}>
        {postObj.additionalComments != null ? (
          <ViewMoreText numberOfLines={2}>
            <Text style={styles.commentsText}>
              {postObj.additionalComments}
            </Text>
          </ViewMoreText>
        ) : null}
        <TouchableOpacity
          onPress={() =>
            !isFileUploading() ? deleteItem(itemIndex) : undefined
          }
        >
          <View style={styles.singleIconWrapper}>
            {!isFileUploading() ? (
              <MaterialIcons name={'delete'} size={24} color='black' />
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={showImagePreview}>
        <View style={styles.coverPhotoWrapper}>
          <Image style={styles.coverPhoto} source={{ uri: postObj.imageUrl }} />
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.iconWrapper}>
        <View style={styles.postAudioWrapper}>
          {isValidValue(postObj.audioItem) ? (
            <AudioPlayer
              audioItem={postObj.audioItem}
              durationOnRight={true}
              textColor='black'
              onlyIcon={true}
              color={ThemeColors.black}
            />
          ) : null}
        </View>

        <View style={styles.singleIconWrapper}>
          <ProgressUploadStatus
            returnEmpty={isCurrentReduxRecord}
            isFailed={postObj.recordUpdateFailed}
            progress={postObj.progress}
            isComplete={postObj.uploadComplete}
            onReUpload={reUploadData}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.get('screen').width,
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

    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  smallPadding: {
    paddingHorizontal: 15,
  },
  singleIconWrapper: {
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  coverPhoto: {
    width: Dimensions.get('screen').width,
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
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
export default UploadPostItem;
