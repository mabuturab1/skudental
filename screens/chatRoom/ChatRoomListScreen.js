import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { SingleChatView } from '../../components';
import { routes } from '../../constants/routes';
const ChatRoomListScreen = ({ navigation }) => {
  const chatRooms = useSelector(({ chatRoom }) => chatRoom.chatRoomsArr);
  const dummyData = [
    {
      _id: '2',
      title: 'Testing Title',
      subtitle: 'Address',
      createdAt: 'today',
    },
  ];
  const onPress = (chatRoomId) => {
    navigation.navigate(routes.ChatRoom, { chatRoomId });
  };
  const renderSingleItem = ({ item }) => (
    <SingleChatView item={item} onPress={onPress} key={item._id} />
  );
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={dummyData}
        renderItem={renderSingleItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  listItem: {
    width: '100%',
    padding: 10,
  },
});
export default ChatRoomListScreen;
