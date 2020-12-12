import React, { useRef } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { UploadImageItem } from '../../components';
import { routes } from '../../constants/routes';
const SaveRecordScreen = ({ route, navigation }) => {
  const { currentRecordIndex } = route.params;
 
  const uploadingDataArr = useSelector(({ record }) => record.uploadingDataArr) || [];
  let attachedItems = [];
  if (uploadingDataArr?.length >= currentRecordIndex + 1) {
    attachedItems = uploadingDataArr[currentRecordIndex].attachedItems;
  }
  const carouselItemsList = attachedItems.map((el, index) => ({
    id: index.toString(),
    ...el,
  }));
  const sendImageData = () => {};

  const renderItem = ({ item, index }) => {
    return (
      <UploadImageItem imageObj={item} index={index} navigation={navigation} />
    );
  };
  const carouselRef = useRef();

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <FlatList
        data={carouselItemsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};
export default SaveRecordScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: '#e5e5ea',
  },

  carouselWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
