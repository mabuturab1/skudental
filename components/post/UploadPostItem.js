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
import CircularProgressbar from '../progressbar/CircularProgressbar';
import { ThemeColors } from '../../constants/Colors';
import { routes } from '../../constants/routes';
import { isAndroid, isValidValue } from '../../helpers/Utils';
import { uploadRecordPhoto } from '../../store/record/actions';
import AudioPlayer from '../audio/AudioPlayer';
const UploadPostItem = ({
  postObj,
  navigation,
  currentRecordIndex,
  itemIndex,
  isServerRecord=true,
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
      isCurrentReduxRecord
      
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
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconWrapper}>
        {postObj.additionalComments != null ? (
          <Text style={styles.commentsText}>{postObj.additionalComments}</Text>
        ) : null}
        <TouchableOpacity onPress={() => deleteItem(itemIndex)}>
          <View style={styles.singleIconWrapper}>
            <MaterialIcons name={'delete'} size={24} color='black' />
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
              isSmallAudioPlayerButton={true}
              durationOnRight={true}
              textColor='black'
            />
          ) : null}
        </View>

        <View style={styles.singleIconWrapper}>
          {postObj.recordUpdateFailed ? (
            <TouchableOpacity onPress={reUploadData}>
              <Ionicons
                name={isAndroid() ? 'md-refresh-circle' : 'ios-refresh-circle'}
                color={ThemeColors.primary}
                size={24}
              />
            </TouchableOpacity>
          ) : postObj.progress != null && !postObj.uploadComplete ? (
            <CircularProgressbar progress={postObj.progress} />
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
    paddingHorizontal: 50,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
export default UploadPostItem;
