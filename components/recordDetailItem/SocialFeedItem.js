import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import CarouselItems from './CarouselItems';
import { ThemeColors } from '../../constants/Colors';
import { useSelector } from 'react-redux';
const SocialFeedItem = ({ navigation, record, currentRecordIndex }) => {
  const user = useSelector(({ auth }) => auth.user);
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.infoContainer}>
        <Image
          source={
            user?.profileImageUrl
              ? { uri: user?.profileImageUrl }
              : require('../../assets/defaultImage.png')
          }
          style={styles.avatarImage}
        />
        <View style={styles.usernameContainer}>
          <Text> {record?.recordOwner?.name} </Text>
          {record?.createdAt ? (
            <Text style={styles.createdAt}> {record?.createdAt} </Text>
          ) : null}
        </View>
      </View>
      <View>
        <CarouselItems
          navigation={navigation}
          currentRecordIndex={currentRecordIndex}
          carouselItems={record?.attachedPosts}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  infoContainer: { flexDirection: 'row', height: 50, alignSelf: 'stretch' },
  avatarImage: {
    borderRadius: 20,
    width: 40,
    height: 40,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  usernameContainer: { justifyContent: 'center', flexDirection: 'column' },
  createdAt: { fontSize: 10 },
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
export default SocialFeedItem;
