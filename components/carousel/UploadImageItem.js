import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View, Image, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Paragraph, Title } from 'react-native-paper';
import { isAndroid } from '../../helpers/Utils';
const UploadImageItem = ({
  item,
  index,
  onAddComments,
  isLastItem,
  sendImageData,
  initTextValue,
}) => {
  console.log(isLastItem);
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <Paragraph>{initTextValue}</Paragraph>
        <Image style={styles.coverPhoto} source={{ uri: item.path }} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    paddingVertical:10,
    backgroundColor:'white'
  },
  card: {
    width: '100%',
    height: '100%',
    alignItems:'center'
  },
  coverPhoto: {
    width: '98%',
    height: '95%',
    resizeMode: 'cover',
  },

  textInput: {
    paddingHorizontal: 20,
    marginLeft: 20,
    marginRight: 20,

    bottom: 40,
    color: 'black',
  },
});
export default UploadImageItem;
