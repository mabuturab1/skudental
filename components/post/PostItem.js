import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { Fragment, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import PostAudio from './PostAudio';
import { isAndroid, isValidValue } from '../../helpers/Utils';
import RoundedButton from '../button/RoundedButton';
import ProgressUploadStatus from '../progressUploadStatus/ProgressUploadStatus';
import LoadingIndicator from '../loader/LoadingIndicator';
import { ThemeColors } from '../../constants/Colors';
import { createAlert } from '../alert/AlertModal';
const PostItem = ({
  postObj,
  itemIndex,
  isPreviewOnly = false,
  isEditAllowed = true,
  onAddComments = () => {},
  onAudioUpdate = () => {},
  onDelete = () => {},
  uploadProgress = 0,
  isUploadComplete = true,
  isCurrentReduxRecord = false,
  showLoaderAtActionsContainer = false,
  sendImageData,
  onSavePost = () => {},
}) => {
  const onEditPostItem = () => {
    setIsEditMode(false);
    onSavePost();
  };
  const onDeletePost = () => {
    if (!postObj._id) {
      console.log('deleting post', isCurrentReduxRecord, postObj._id);
      onDelete();
      return;
    }
    createAlert(
      'Delete Record',
      'By deleting your post, any audio audio/comments attached to this post, will be deleted also. Click Ok to proceed',
      (result) => {
        if (!result) return;
        onDelete();
      }
    );
  };
  const [imageLoading, setImageLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(isEditAllowed);
  const [canSwitchToEditMode] = useState(isEditAllowed === false);
  return (
    <View style={styles.imageItemWrapper}>
      {imageLoading ? <LoadingIndicator color={ThemeColors.primary} /> : null}
      <View style={styles.topIconsContainer}>
        {!isPreviewOnly ? (
          showLoaderAtActionsContainer ? (
            <View style={styles.postButtons}>
              <LoadingIndicator
                alignCenter={false}
                color={'white'}
                isSmall={true}
              />
            </View>
          ) : (
            <View style={styles.postButtons}>
              <View style={styles.singleIcon}>
                <TouchableOpacity onPress={onDeletePost}>
                  <AntDesign name='delete' size={24} color='white' />
                </TouchableOpacity>
              </View>
              {canSwitchToEditMode ? (
                <Fragment>
                  {!isEditMode ? (
                    <View style={styles.singleIcon}>
                      <TouchableOpacity onPress={() => setIsEditMode(true)}>
                        <FontAwesome name={'edit'} size={24} color={'white'} />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.singleIcon}>
                      <TouchableOpacity onPress={onEditPostItem}>
                        <Ionicons
                          name={
                            isAndroid() ? 'md-save-sharp' : 'ios-save-sharp'
                          }
                          size={24}
                          color={'white'}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={styles.singleIcon}>
                    {!isCurrentReduxRecord ? (
                      <ProgressUploadStatus
                        isFailed={
                          isValidValue(uploadProgress) && uploadProgress < 0
                        }
                        isComplete={isUploadComplete}
                        progress={uploadProgress}
                        onReUpload={onSavePost}
                      />
                    ) : null}
                  </View>
                </Fragment>
              ) : null}
            </View>
          )
        ) : (
          <View></View>
        )}
        {!showLoaderAtActionsContainer ? (
          <PostAudio
            isEditAllowed={isEditMode && !isPreviewOnly}
            initAudioItem={
              postObj.audioUrl ? { uri: postObj.audioUrl } : postObj.audioItem
            }
            tempId={postObj._id || postObj.postTempId}
            itemIndex={itemIndex}
            onAudioUpdate={(audio) => onAudioUpdate(itemIndex, audio)}
          />
        ) : (
          <View></View>
        )}
      </View>
      <Image
        onError={({ nativeEvent: { error } }) => console.log(error)}
        onLoadStart={() => setImageLoading(true)}
        onLoadEnd={() => setImageLoading(false)}
        style={styles.singleImage}
        source={{
          uri: postObj.imageUrl,
        }}
      />
      <View>
        <TextInput
          style={styles.textInput}
          defaultValue={postObj.additionalComments || ''}
          placeholderTextColor='rgba(255,255,255,0.6)'
          placeholder={isEditMode ? 'Add comments' : ''}
          editable={isEditMode}
          multiline
          onChangeText={(text) => onAddComments(itemIndex, text)}
        />
      </View>

      {!canSwitchToEditMode && !isPreviewOnly ? (
        <View style={styles.sendButton}>
          <RoundedButton
            onPress={sendImageData}
            style={{
              backgroundColor: ThemeColors.primary,
              borderColor: ThemeColors.primary,
            }}
            icon={
              <Ionicons
                name={isAndroid() ? 'md-save-sharp' : 'ios-save-sharp'}
                size={24}
                color={'white'}
              />
            }
          />
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  imageItemWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    position: 'relative',
  },

  singleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textInput: {
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    bottom: 40,
    color: 'white',
  },
  sendButton: {
    position: 'absolute',
    bottom: 140,
    right: 10,
    zIndex: 1000,
  },
  postButtons: { flexDirection: 'row', padding: 15 },
  topIconsContainer: {
    position: 'absolute',
    top: 40,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 1000,
    backgroundColor: ThemeColors.mediumBlack,
  },

  singleIcon: {
    paddingRight: 30,
  },
});
export default PostItem;
