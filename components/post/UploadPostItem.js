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
import { createAlert } from '../alert/AlertModal';
import LoadingIndicator from '../loader/LoadingIndicator';
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
  const [isDeleting, setIsDeleting] = useState(false);
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
  const onDeletePost = (itemIndex) => {
    if (!postObj._id) {
      deletItem(itemIndex);
      return;
    }
    createAlert(
      'Delete Record',
      'By deleting your post, any audio audio/comments attached to this post, will be deleted also. Click Ok to proceed',
      (result) => {
        if (!result) return;
        setIsDeleting(true);
        deleteItem(itemIndex, (isSuccess) => {
          if (!isSuccess) setIsDeleting(false);
        });
      }
    );
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
     {isDeleting ? (
        <View style={styles.loadingIndicator}>
          <LoadingIndicator />
        </View>
      ) : null}

      <View style={{ ...styles.iconWrapper, ...styles.smallPadding }}>
        {postObj.additionalComments != null ? (
          <View style={styles.additionalCommentsWrapper}>
            <ViewMoreText numberOfLines={2}>
              <Text style={styles.commentsText}>
                {postObj.additionalComments}
              </Text>
            </ViewMoreText>
          </View>
        ) : null}
        <TouchableOpacity
          onPress={() =>
            !isFileUploading() ? onDeletePost(itemIndex) : undefined
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
    position: 'relative',
    minHeight: 550,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginVertical: 10,
  },
  additionalCommentsWrapper: {
    flex: 1,
  },
  iconWrapper: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 55,

    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
  },
  smallPadding: {
    paddingHorizontal: 15,
  },
  singleIconWrapper: {
    width: 40,
    height: 55,
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
  loadingIndicator: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
export default UploadPostItem;
