import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import {
  chatRoomsCollection,
  firestore,
} from '../../helpers/firebase/Firebase';
import { v4 as uuid } from 'uuid';
import { convertDate } from '../../helpers/Utils';
const RoomScreen = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { userId, allChatRooms = [] } = useSelector(({ auth, chatRoom }) => ({
    userId: auth.user?._id,
    allChatRooms: chatRoom.allChatRooms,
  }));
  const chatRoomId = route.params.chatRoomId;
  const currentChatRoom =
    allChatRooms.find((el) => el._id === chatRoomId) || {};
  const firebaseId = currentChatRoom.firebaseId;
  useEffect(() => {
    const currentRoom = allChatRooms.find((el) => el._id === chatRoomId) || {};
    if (currentRoom.messages.length > messages.length) {
      setMessages(
        currentRoom.messages?.map((el) => getTransformedMessages(el)).reverse()
      );
    }
  }, [allChatRooms, messages, getTransformedMessages]);
  const getMemebersInfo = useCallback(
    (id) => {
      if (!id) return {};
      const currentRoom =
        allChatRooms.find((el) => el._id === chatRoomId) || {};
      const user = currentRoom?.members?.find((el) => el._id === id);
      return {
        _id: id,
        name: user?.name,
        avatar: user?.profileImageUrl,
      };
    },
    [allChatRooms]
  );
  const getTransformedMessages = useCallback(
    (message) => {
      const msg = convertDate(message);
      return {
        _id: msg._id || uuid(),
        text: msg.chatMessage,
        createdAt: msg.createdAt || '',
        user: getMemebersInfo(msg?.messageOwner),
      };
    },
    [getMemebersInfo]
  );

  async function handleSend(messageObj) {
    if (!chatRoomId) return;
    let newMessageArr = messageObj.map((el) => ({
      _id: el._id,
      chatMessage: el.text,
      messageOwner: el.user?._id,
      createdAt: el.createdAt,
    }));

    await chatRoomsCollection
      .doc(firebaseId)
      .update({ messages: firestore.FieldValue.arrayUnion(...newMessageArr) });
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#6646ee' />
        </View>
      </Send>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: userId }}
      placeholder='Type your message here...'
      alwaysShowSend
      showUserAvatar
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default RoomScreen;
