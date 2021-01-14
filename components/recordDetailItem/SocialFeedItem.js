import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import CarouselItems from './CarouselItems';
import { ThemeColors } from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
import AudioPlayer from '../audio/AudioPlayer';
import { routes } from '../../constants/routes';
import RecordStatusSet from '../post/RecordStatusSetButton';
import ViewMoreText from '../viewMoreText/ViewMoreText';
import { deleteRecord } from '../../store/actions';
import LoadingIndicator from '../loader/LoadingIndicator';
import { createAlert } from '../alert/AlertModal';
import MaterialMenu from '../menu/Menu';
const SocialFeedItem = ({ navigation, record, currentRecordIndex }) => {
  const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();
  const [activeCarouselItem, setActiveCarouselItem] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
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
  const getRecordItem = () => {
    if (record.recordOwner?._id === user?._id) return record;
    return null;
  };
  const navigateToUserProfile = () => {
    if (record?.recordOwner?._id)
      navigation.navigate(routes.UserRecordList, {
        userId: record?.recordOwner._id,
        title: record?.recordOwner?.name,
      });
  };
  const popupMenu = () => {
    const popupMenuData = [{ label: 'Delete Record', id: 'DELETE' }];

    const onPopupMenuClick = (id) => {
      switch (id) {
        case 'DELETE':
          deletePost();
      }
    };
    return (
      <MaterialMenu
        data={popupMenuData}
        color={ThemeColors.black}
        onItemClick={onPopupMenuClick}
        iconSize={18}
      />
    );
  };
  const deletePost = () => {
    createAlert(
      'Delete Record',
      'By deleting your record, all attached posts will be deleted. Click Ok to proceed',
      (result) => {
        if (!result) return;
        setIsDeleting(true);
        dispatch(deleteRecord(record._id), (isSuccess) => {
          setIsDeleting(false);
        });
      }
    );
  };
  console.log('deleting post', isDeleting);
  return (
    <View style={styles.cardWrapper}>
      {isDeleting ? (
        <View style={styles.loadingIndicator}>
          <LoadingIndicator />
        </View>
      ) : null}
      <View style={styles.infoContainer}>
        <Image
          source={
            record?.recordOwner?.profileImageUrl
              ? { uri: record?.recordOwner?.profileImageUrl }
              : require('../../assets/defaultImage.png')
          }
          style={styles.avatarImage}
        />
        <TouchableOpacity activeOpacity={0.6} onPress={navigateToUserProfile}>
          <View style={styles.userNameContainer}>
            <Text style={styles.userName}> {record?.recordOwner?.name} </Text>
            {record?.createdAt ? (
              <Text style={styles.createdAt}> {record?.createdAt} </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.popupMenu}>{popupMenu()}</View>
      <View style={styles.carouselItemsWrapper}>
        {record?.attachedPosts.length > 1 ? (
          <Text style={styles.indexWrapper}>{`${activeCarouselItem + 1}/${
            record?.attachedPosts.length
          }`}</Text>
        ) : null}
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
              color={ThemeColors.socialFeedIconColor}
              durationOnRight={true}
              textColor='black'
              audioItem={getAudioItem(activeCarouselItem)}
            />
          ) : null}
          {getRecordItem() ? (
            <RecordStatusSet record={getRecordItem()} />
          ) : null}
        </View>
        <View style={styles.feedTextWrapper}>
          {getTextItem(activeCarouselItem) ? (
            <ViewMoreText numberOfLines={2} textStyle={styles.feedText}>
              <Text style={styles.feedText}>
                {getTextItem(activeCarouselItem)}
              </Text>
            </ViewMoreText>
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
  userNameContainer: { justifyContent: 'center', flexDirection: 'column' },
  userName: { fontFamily: 'RalewaySemiBold', color: ThemeColors.mediumBlack },
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
    position: 'relative',
  },
  feedButtonWrapper: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  feedTextWrapper: { minHeight: 50 },
  carouselItemsWrapper: { position: 'relative' },
  indexWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 15,
    zIndex: 1000,
    backgroundColor: ThemeColors.mediumBlack,
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    color: 'white',
    textAlignVertical: 'center',
    fontFamily: 'RalewaySemiBold',
    lineHeight: 18,
  },
  feedText: {
    fontSize: 14,
    paddingHorizontal: 15,
    fontFamily: 'RalewayMedium',
    color: 'black',
    opacity: 0.7,
  },
  popupMenu: {
    position: 'absolute',
    top: 10,
    right: 0,
  },
  loadingIndicator: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
export default SocialFeedItem;
