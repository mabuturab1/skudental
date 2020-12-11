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
  const uploadingData = useSelector(({ record }) => record.uploadingData) || [];
  let attachedItems = [];
  if (uploadingData.length >= currentRecordIndex + 1) {
    attachedItems = uploadingData[currentRecordIndex];
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
