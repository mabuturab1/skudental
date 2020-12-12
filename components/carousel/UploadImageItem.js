import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { ThemeColors } from '../../constants/Colors';
import { routes } from '../../constants/routes';
import { isAndroid } from '../../helpers/Utils';
const UploadImageItem = ({ imageObj, navigation, isUploadedToServer }) => {
  const dispatch = useDispatch();
  const [sendToServer, setSendToServerStatus] = useState(false);
  useEffect(() => {}, []);
  const showImagePreview = () => {
    navigation.navigate(routes.ImagePreview, {
      imageObj,
    });
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
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.iconWrapper}>
        <View></View>
        <View style={styles.singleIconWrapper}>
          <Ionicons
            name={isAndroid() ? 'md-checkmark-done' : 'ios-checkmark-done'}
            color={ThemeColors.primary}
            size={24}
          />
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

  commentsText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});
export default UploadImageItem;
