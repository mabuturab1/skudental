import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import CarouselItems from './CarouselItems';
import { ThemeColors } from '../../constants/Colors';
import { useSelector } from 'react-redux';
import AudioPlayer from '../audio/AudioPlayer';
const SocialFeedItem = ({ navigation, record, currentRecordIndex }) => {
  const user = useSelector(({ auth }) => auth.user);
  const [activeCarouselItem, setActiveCarouselItem] = useState(0);
  const getTextItem = (index) => {
    if (record?.attachedPosts.length <= index) return null;
    const item = record?.attachedPosts[index];
    if (item.additionalComments?.length) return item.additionalComments;
    else return null;
  };
  const getAudioItem = (index) => {
    if (record?.attachedPosts.length <= index) return null;
    const item = record?.attachedPosts[index];
    return item.audioItem;
  };
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.infoContainer}>
        <Image
          source={
            record?.recordOwner?.profileImageUrl
              ? { uri:  record?.recordOwner?.profileImageUrl }
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
          isServerRecord={true}
          isCurrentReduxRecord={false}
          onSnapToItem={(index) => setActiveCarouselItem(index)}
        />
      </View>
      <View>
        <View style={styles.feedButtonWrapper}>
          {getAudioItem(activeCarouselItem) ? (
            <AudioPlayer
              onlyIcon={true}
              color='#aeaeae'
              durationOnRight={true}
              textColor='black'
              audioItem={getAudioItem(activeCarouselItem)}
            />
          ) : null}
        </View>
        <View style={styles.feedTextWrapper}>
          {getTextItem(activeCarouselItem) ? (
            <Text style={styles.feedText}>
              {getTextItem(activeCarouselItem)}
            </Text>
          ) : (
            <Text style={{ ...styles.feedText, opacity: 0.2 }}>
              No comments{' '}
            </Text>
          )}
        </View>
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
  feedButtonWrapper: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  feedTextWrapper: { height: 40 },
  feedText: {
    fontSize: 14,
    paddingHorizontal: 15,
    fontFamily: 'RobotoMedium',
    color: 'black',
    opacity: 0.7,
  },
});
export default SocialFeedItem;
