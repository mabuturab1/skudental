import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PostAudio from './PostAudio';
import { isAndroid } from '../../helpers/Utils';
import RoundedButton from '../button/RoundedButton';
const PostItem = ({
  postObj,
  itemIndex,
  isEditAllowed = true,
  onAddComments = () => {},
  onAudioUpdate = () => {},
  onDelete = () => {},
  isLastItem,
  sendImageData,
}) => {
  return (
    <View style={styles.imageItemWrapper}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onDelete}>
          <AntDesign name='delete' size={24} color='white' />
        </TouchableOpacity>
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
          placeholder={isEditAllowed ? 'Add comments' : ''}
          editable={isEditAllowed}
          onChangeText={(text) => onAddComments(itemIndex, text)}
        />
      </View>

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

      <View style={styles.postAudioWrapper}>
        <PostAudio
          isEditAllowed={isEditAllowed}
          initUrl={postObj.audioUrl}
          itemIndex={itemIndex}
          onAudioUpdate={(audio) => onAudioUpdate(itemIndex, audio)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imageItemWrapper: {
    flex: 1,
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
  postAudioWrapper: {
    position: 'absolute',
    top: 40,
    right: 5,
  },
  iconContainer: {
    position: 'absolute',
    top: 40,
    left: 5,
    zIndex: 1000,
  },
});
export default PostItem;
