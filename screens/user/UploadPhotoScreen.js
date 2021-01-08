import React, { useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, updateUserPhoto } from '../../store/actions';

import ImagePicker from 'react-native-image-crop-picker';
import { LoadingIndicator, ProgressUploadStatus } from '../../components';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
const UploadPhotoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector(({ auth }) => auth.user);
  const nextUpdateDue = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isFailed, setIsFailed] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const uploadedPhoto = useRef(null);
  const uploadProgress = (progressEvent) => {
    if (nextUpdateDue > moment().unix()) {
      return;
    }
    var newProgress = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    nextUpdateDue.current = moment().add(4, 'seconds').unix();
    setProgress(newProgress);
  };
  const onPhotoUpload = () => {
    nextUpdateDue.current = 0;
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then((image) => {
        uploadedPhoto.current = {
          ...image,
          name: image.path?.split('/')?.pop()
            ? Date.now().toString() + image.path?.split('/').pop()
            : Date.now().toString() + image.mime,
        };
        startUploadingFile();
      })
      .catch((error) => {
        console.log('error in profile pic selection', error);
      });
  };
  const startUploadingFile = () => {
    clearStatus();
    dispatch(
      updateUserPhoto(
        uploadedPhoto.current,
        (isSuccess) => {
          setIsComplete(isSuccess);
          setIsFailed(!isSuccess);
        },
        uploadProgress
      )
    );
  };
  const clearStatus = () => {
    setIsComplete(false);
    setIsFailed(false);
    setProgress(0);
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onPhotoUpload}>
        <View style={styles.uploadPhotoWrapper}>
          <Image
            style={styles.roundPhoto}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            source={
              uploadedPhoto.current
                ? { uri: uploadedPhoto.current.path }
                : user?.profileImageUrl
                ? { uri: user?.profileImageUrl }
                : require('../../assets/defaultImage.png')
            }
          />
          <View style={styles.iconWrapper}>
            <FontAwesome name='edit' size={24} color='black' />
          </View>
        </View>
      </TouchableOpacity>
      {loading ? <LoadingIndicator /> : null}

      {uploadedPhoto.current ? (
        <View style={styles.uploadStatus}>
          <ProgressUploadStatus
            progress={progress}
            isFailed={isFailed}
            isComplete={isComplete}
            onReUpload={startUploadingFile}
          />
        </View>
      ) : null}
      <Text style={styles.updateUserPhoto}>Update user photo</Text>
    </View>
  );
};
export default UploadPhotoScreen;
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  uploadPhotoWrapper: { position: 'relative' },
  roundPhoto: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    borderRadius: 1000,
  },
  iconWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  updateUserPhoto: {
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'RalewayBold',
    fontSize: 16,
  },
  uploadStatus: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
