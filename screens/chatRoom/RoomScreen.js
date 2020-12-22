import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearReceivedMessages,
  getAllChatRoomMessages,
  sendMessages,
} from '../../store/actions';

const RoomScreen = ({ route }) => {
  const { userId, allChatRooms = [], newMessagesObj } = useSelector(
    ({ auth, chatRoom }) => ({
      userId: auth.user?._id,
      allChatRooms: chatRoom.allChatRooms,
      newMessagesObj: chatRoom.newMessagesObj,
    })
  );
  const chatRoomId = route.params.chatRoomId;
  const currentChatRoom =
    allChatRooms.find((el) => el._id === chatRoomId) || {};
  const chatRoomMessages = currentChatRoom?.messages || [];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChatRoomMessages(chatRoomId));
  }, [dispatch]);

  useEffect(() => {
    const currentChatRoomMessages = newMessagesObj[chatRoomId] || [];
    if (!currentChatRoomMessages.length) return;
    const updateMessageObj = currentChatRoomMessages.map((el) => ({
      ...el,
      user: getMemebersInfo(el.user._id),
    }));
    const idsArr = currentChatRoomMessages.map((el) => el._id);
    dispatch(clearReceivedMessages({ chatRoomId, idsArr }));
    setMessages(updateMessageObj.concat(messages));
  }, [newMessagesObj, chatRoomId, getMemebersInfo, messages]);
  const getMemebersInfo = useCallback(
    (id) => {
      if (!id) return {};
      const currentRoom =
        allChatRooms.find((el) => el._id === chatRoomId) || {};
      const user = currentRoom?.members?.find((el) => el._id === id);
      console.log('returning obj', {
        _id: id,
        name: user?.name,
        avatar: user?.profileImageUrl,
      });
      return {
        _id: id,
        name: user?.name,
        avatar: user?.profileImageUrl,
      };
    },
    [allChatRooms]
  );
  const getTransformedMessages = (msg) => {
    return {
      _id: msg._id,
      text: msg.chatMessage,
      createdAt: msg.createdAt || '',
      user: getMemebersInfo(msg?.messageOwner),
    };
  };
  const [messages, setMessages] = useState(
    chatRoomMessages.map((el) => getTransformedMessages(el)).reverse()
  );
  //   const { thread } = route.params;
  //   const { user } = useContext(AuthContext);
  //   const currentUser = user.toJSON();

  async function handleSend(messageObj) {
    if (!chatRoomId) return;
    console.log('messages', messageObj);
    let newMessageArr = messageObj.map((el) => ({
      chatMessage: el.text,
      messageOwner: el.user?._id,
      createdAt: el.createdAt,
    }));

    dispatch(
      sendMessages(chatRoomId, newMessageArr, (isSuccess) => {
        console.log('is success is', isSuccess);
        if (isSuccess) {
          const updateMessageObj = messageObj.map((el) => ({
            ...el,
            user: getMemebersInfo(el.user._id),
          }));
          setMessages(updateMessageObj.concat(messages));
        }
      })
    );
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
