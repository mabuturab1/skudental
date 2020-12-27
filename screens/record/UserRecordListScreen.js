import { Ionicons } from '@expo/vector-icons';
import React, { Fragment, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyList, ImageTile, LoadingIndicator } from '../../components';

import { routes } from '../../constants/routes';

import { getAllUserRecords } from '../../store/record/actions';
const UserRecordListScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { userId } = route.params;
  const { currentUserRecordsArr = [], dataLoading } = useSelector(
    ({ record }) => ({
      currentUserRecordsArr: record.currentUserRecordsArr,
      dataLoading: record.loading.getAllUserRecords,
    })
  );
  const currentUser = currentUserRecordsArr.length
    ? currentUserRecordsArr[0].recordOwner
    : {};
  useEffect(() => {
    dispatch(getAllUserRecords(userId));
  }, [dispatch, userId]);
  const showRecordPreview = (record) => {
    navigation.navigate(routes.UserSingleRecordPreview, { record });
  };
  const renderItem = ({ item, index }) => {
    const post = item?.attachedPosts[0];
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => showRecordPreview(item)}
      >
        <View style={styles.imageTile}>
          <ImageTile
            imageUrl={post.imageUrl}
            overlayText={item?.createdAt}
            showOverlayText={true}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const refreshData = () => {
    dispatch(getAllUserRecords(userId));
  };

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.infoContainer}>
        <Image
          source={
            currentUser?.profileImageUrl
              ? { uri: currentUser?.profileImageUrl }
              : require('../../assets/defaultImage.png')
          }
          style={styles.avatarImage}
        />
        <TouchableOpacity
          onPress={
            currentUser?._id
              ? () =>
                  navigation.navigate(routes.UserRecordList, {
                    userId: currentUser._id,
                  })
              : undefined
          }
        >
          <View style={styles.usernameContainer}>
            <Text> {currentUser?.name} </Text>
          </View>
        </TouchableOpacity>
      </View>
      {currentUserRecordsArr.length > 0 ? (
        <FlatList
          data={currentUserRecordsArr}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={dataLoading} onRefresh={refreshData} />
          }
        />
      ) : (
        <EmptyList dataLoading={dataLoading} refreshData={refreshData} />
      )}
    </SafeAreaView>
  );
};
export default UserRecordListScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: '#e5e5ea',
  },
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
  noDataWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noDataText: {
    textAlign: 'center',
  },
  carouselWrapper: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
