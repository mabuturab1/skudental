import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ImageTileList from '../image/ImageTileList';
const RecordDetailItem = ({ record, currentRecordIndex, isServerRecord }) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.recordNameWrapper}>
        <Text>{record.ownerName}</Text>
      </View>
      <View style={styles.imageListWrapper}>
        <ImageTileList
          currentRecordIndex={currentRecordIndex}
          imageList={record.attachedPosts}
          maxImages={6}
          isServerRecord={isServerRecord}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  recordNameWrapper: {
    alignItems: 'flex-start',
  },
  imageListWrapper: {},
  cardWrapper: {
    width: '100%',
  },
});
export default RecordDetailItem;
