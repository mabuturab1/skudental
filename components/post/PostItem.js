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
const PostItem = ({
  postObj,
  itemIndex,
  showPostEditButtons = true,
  isEditAllowed = true,
  onAddComments = () => {},
  onAudioUpdate = () => {},
  onDelete = () => {},
  uploadProgress = 0,
  isUploadComplete = true,
  isCurrentReduxRecord = false,
  isLastItem,
  sendImageData,
  onSavePost = () => {},
}) => {
  const onEditPostItem = () => {
    setIsEditMode(false);
    onSavePost();
  };
  const [isEditMode, setIsEditMode] = useState(isEditAllowed);
  const [canSwitchToEditMode] = useState(isEditAllowed === false);
  console.log('post obj is', postObj);
  return (
    <View style={styles.imageItemWrapper}>
      <View style={styles.topIconsContainer}>
        {showPostEditButtons ? (
          <View style={styles.postButtons}>
            <View style={styles.singleIcon}>
              <TouchableOpacity onPress={onDelete}>
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
                        name={isAndroid() ? 'md-save-sharp' : 'ios-save-sharp'}
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
        ) : null}
        <PostAudio
          isEditAllowed={isEditMode}
          initAudioItem={
            postObj.audioUrl ? { uri: postObj.audioUrl } : postObj.audioItem
          }
          itemIndex={itemIndex}
          onAudioUpdate={(audio) => onAudioUpdate(itemIndex, audio)}
        />
      </View>
      <Image
        onError={({ nativeEvent: { error } }) => console.log(error)}
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
          onChangeText={(text) => onAddComments(itemIndex, text)}
        />
      </View>

      {!canSwitchToEditMode ? (
        <View style={styles.sendButton}>
          <RoundedButton
            onPress={sendImageData}
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
  },

  singleIcon: {
    paddingRight: 30,
  },
});
export default PostItem;
