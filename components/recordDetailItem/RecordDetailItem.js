import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ImageTileList from '../image/ImageTileList';
import { API_URL } from '../../constants/apiRoutes';
const RecordDetailItem = ({
  navigation,
  record,
  currentRecordIndex,
  isServerRecord,
}) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.recordNameWrapper}>
        <Text style={styles.ownerNameText}>{record?.recordOwner?.name}</Text>
        <Text style={styles.creationDateText}>{record?.createdAt}</Text>
      </View>

      <View style={styles.imageListWrapper}>
        <ImageTileList
          navigation={navigation}
          currentRecordIndex={currentRecordIndex}
          imageList={record?.attachedPosts}
          maxImages={3}
          isServerRecord={isServerRecord}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  recordNameWrapper: {
    alignItems: 'flex-start',
    marginVertical: 25,
    marginHorizontal: 15,
  },
  ownerNameText: {
    fontSize: 18,
    color: 'black',
  },
  creationDateText: { fontSize: 12, color: 'rgba(0,0,0,0.5)' },
  imageListWrapper: {},
  cardWrapper: {
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 10,
  },
});
export default RecordDetailItem;
