import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ImageTileList from '../image/ImageTileList';
import { API_URL } from '../../constants/apiRoutes';
import { ThemeColors } from '../../constants/Colors';
const RecordDetailItem = ({
  navigation,
  record,
  currentRecordIndex,
  isServerRecord,
}) => {
  return (
    <View style={styles.cardWrapper}>
      {/* <View style={styles.recordNameWrapper}>
        <Text style={styles.ownerNameText}>{record?.recordOwner?.name}</Text>
        <Text style={styles.creationDateText}>{record?.createdAt}</Text>
      </View> */}
      <View style={styles.infoContainer}>
        <Image source={{ uri: '' }} style={styles.avatarImage} />
        <View style={styles.usernameContainer}>
          <Text> {record?.recordOwner?.name} </Text>
          {record?.createdAt ? (
            <Text style={styles.location}> {record?.createdAt} </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.imageListWrapper}>
        <ImageTileList
          navigation={navigation}
          currentRecordIndex={currentRecordIndex}
          attachedPosts={record?.attachedPosts}
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
  infoContainer: { flexDirection: 'row', height: 45, alignSelf: 'stretch' },
  avatarImage: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  usernameContainer: { justifyContent: 'center', flexDirection: 'column' },
  location: { fontSize: 10 },
  ownerNameText: {
    fontSize: 18,
    color: 'black',
  },
  creationDateText: { fontSize: 12, color: ThemeColors.lightBlack },
  imageListWrapper: {},
  cardWrapper: {
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 10,
  },
});
export default RecordDetailItem;
