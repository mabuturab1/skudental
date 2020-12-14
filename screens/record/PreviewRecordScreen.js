import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { UploadPostItem } from '../../components';
const PreviewRecordScreen = ({ route, navigation }) => {
  const { currentRecordIndex } = route.params;
  const uploadingDataArr =
    useSelector(({ record }) => record.uploadingDataArr) || [];
  let attachedItems = [];
  if (uploadingDataArr?.length >= currentRecordIndex + 1) {
    attachedItems = uploadingDataArr[currentRecordIndex].attachedItems;
  }
  const carouselItemsList = attachedItems.map((el, index) => ({
    id: index.toString(),
    ...el,
  }));

  const renderItem = ({ item, index }) => {
    return (
      <UploadPostItem
        currentRecordIndex={currentRecordIndex}
        imageObj={item}
        itemIndex={index}
        navigation={navigation}
      />
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
export default PreviewRecordScreen;
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
