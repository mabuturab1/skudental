import { Ionicons } from '@expo/vector-icons';
import React, { Fragment, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { EmptyList, ImageTile, LoadingIndicator } from '../../components';
import { ThemeColors } from '../../constants/Colors';

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
  const getUserOverviewList = () => {
    const list = [];
    list.push({ label: 'Records', value: currentUserRecordsArr.length });
    list.push({
      label: 'Posts',
      value: currentUserRecordsArr.reduce(
        (sum, el) => sum + (el?.attachedPosts?.length || 0),
        0
      ),
    });
    return list;
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
            overlayTextStyles={{ fontSize: 14 }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  const refreshData = () => {
    dispatch(getAllUserRecords(userId));
  };
  const userOverviewList = getUserOverviewList();

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      <View style={styles.infoContainer}>
        <View style={styles.imageContainerWrapper}>
          <View style={styles.avatarImageWrapper}>
            <Image
              source={
                currentUser?.profileImageUrl
                  ? { uri: currentUser?.profileImageUrl }
                  : require('../../assets/defaultImage.png')
              }
              style={styles.avatarImage}
            />
          </View>
          <View style={styles.userOverview}>
            {userOverviewList?.map((el, index) => (
              <View key={index} style={styles.infoLabelValueWrapper}>
                <Text style={styles.infoValue}>{el.value}</Text>
                <Text style={styles.infoLabel}>{el.label}</Text>
              </View>
            ))}
          </View>
          <View></View>
        </View>

        <View style={styles.usernameContainer}>
          <Text style={styles.userName}> {currentUser?.name} </Text>
        </View>
      </View>
      {currentUserRecordsArr.length > 0 ? (
        <FlatList
          data={currentUserRecordsArr}
          numColumns={3}
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
  infoContainer: {
    height: 100,
    alignSelf: 'stretch',
    marginBottom: 70,
    paddingHorizontal: 5,
  },
  imageContainerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: { fontFamily: 'RalewayBold', color: ThemeColors.mediumBlack,  },
  userOverview: { flexDirection: 'row' },
  infoLabelValueWrapper: { alignItems: 'center', marginHorizontal: 15 },
  infoLabel: { fontSize: 16, fontFamily: 'RalewaySemiBold' },
  infoValue: {
    fontSize: 20,
    fontFamily: 'RalewayBold',
    color: ThemeColors.mediumBlack,
    fontWeight: '900',
  },
  avatarImage: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  avatarImageWrapper: {
    borderRadius: 60,
    width: 112,
    height: 112,
    borderWidth: 3,
    borderColor: ThemeColors.listItemBorder,
    marginHorizontal: 3,
    marginVertical: 3,
    justifyContent: 'center',
    alignItems: 'center',
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
