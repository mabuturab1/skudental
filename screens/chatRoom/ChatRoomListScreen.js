import { Ionicons } from '@expo/vector-icons';
import React, { Fragment, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIndicator, SingleChatView } from '../../components';
import { ThemeColors } from '../../constants/Colors';
import { routes } from '../../constants/routes';
import { chatRoomsCollection } from '../../helpers/firebase/Firebase';
import { isAndroid } from '../../helpers/Utils';
import { getAllChatRooms } from '../../store/actions';
const ChatRoomListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector(({ auth }) => auth?.user?._id);
  const { allChatRooms = [], getAllChatRoomsLoading } = useSelector(
    ({ chatRoom }) => ({
      allChatRooms: chatRoom.allChatRooms,
      getAllChatRoomsLoading: chatRoom.loading.getAllChatRooms,
    })
  );
  useEffect(() => {
    dispatch(getAllChatRooms());
  }, [dispatch]);

  const onPress = (chatRoomId) => {
    navigation.navigate(routes.ChatRoom, { chatRoomId });
  };

  const renderSingleItem = ({ item }) => (
    <SingleChatView item={item} onPress={onPress} key={item._id} />
  );
  const refreshData = () => {
    dispatch(getAllChatRooms());
  };

  return (
    <SafeAreaView style={styles.safeAreaWrapper}>
      {allChatRooms.length > 0 ? (
        <FlatList
          data={allChatRooms}
          renderItem={renderSingleItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={getAllChatRoomsLoading}
              onRefresh={refreshData}
            />
          }
        />
      ) : (
        <View style={styles.noDataWrapper}>
          {getAllChatRoomsLoading ? (
            <LoadingIndicator />
          ) : (
            <Fragment>
              <Text style={styles.noDataText}>
                No Record found. Kindly pull down to refresh data
              </Text>
              <TouchableOpacity onPress={refreshData}>
                <Ionicons
                  name={
                    isAndroid() ? 'md-refresh-circle' : 'ios-refresh-circle'
                  }
                  color={ThemeColors.primary}
                  size={30}
                />
              </TouchableOpacity>
            </Fragment>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};
export default ChatRoomListScreen;
const styles = StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: '#e5e5ea',
    position: 'relative',
  },
  noDataWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noDataText: {
    textAlign: 'center',
  },
});
