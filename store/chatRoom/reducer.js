import {
  GET_ALL_CHAT_ROOM_MESSAGES_START,
  GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS,
  GET_ALL_CHAT_ROOM_MESSAGES_FAILED,
  GET_ALL_CHAT_ROOMS_START,
  GET_ALL_CHAT_ROOMS_SUCCESS,
  GET_ALL_CHAT_ROOMS_FAILED,
  ADD_NEW_MESSAGES,
  CLEAR_RECEIVED_MESSAGES,
  GET_ALL_CHAT_ROOMS_DATA_SUCCESS,
} from './actions';
import {
  addApiUrlInChatRoom,
  addApiUrlInChatRoomsArr,
  updateMessageArr,
  updateMultipleChatRooms,
} from './chatRoomUtilsFunctions';

const initialState = {
  allChatRooms: [],
  newMessagesObj: {},
  firebaseData: [],
  loading: {
    getAllChatRoomMessages: false,
    getAllChatRooms: false,
  },
  error: {
    getAllChatRoomMessages: '',
    getAllChatRooms: '',
  },
};

const addNewMessage = (newMessagesObj, payload) => {
  const chatRoomId = payload.chatRoomId;
  let updatedMessages = newMessagesObj[chatRoomId] || [];
  updatedMessages = updatedMessages.map((el) => ({ ...el }));
  updatedMessages.push(payload.messageObj);
  const updated = {
    ...newMessagesObj,
    [chatRoomId]: updatedMessages.map((el) => ({ ...el })),
  };
  return updated;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHAT_ROOM_MESSAGES_START:
      return {
        ...state,
        loading: { ...state.loading, getAllChatRoomMessages: true },
        error: { ...state.error, getAllChatRoomMessages: '' },
      };
    case GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS:
      return {
        ...state,
        allChatRooms: updateMessageArr(state.allChatRooms, action.payload),
        loading: { ...state.loading, getAllChatRoomMessages: false },
      };
    case GET_ALL_CHAT_ROOM_MESSAGES_FAILED:
      return {
        ...state,
        loading: { ...state.loading, getAllChatRoomMessages: false },
        error: { ...state.error, getAllChatRoomMessages: action.payload },
      };
    case GET_ALL_CHAT_ROOMS_DATA_SUCCESS:
      return {
        ...state,
        firebaseData: action.payload,
        allChatRooms: updateMultipleChatRooms(
          state.allChatRooms,
          action.payload
        ),
        loading: { ...state.loading, getAllChatRoomMessages: false },
      };
    case GET_ALL_CHAT_ROOMS_START:
      return {
        ...state,
        loading: { ...state.loading, getAllChatRooms: true },
        error: { ...state.error, getAllChatRooms: '' },
      };
    case GET_ALL_CHAT_ROOMS_SUCCESS:
      console.log('action payload is', action.payload)
      return {
        ...state,
        allChatRooms: updateMultipleChatRooms(
          addApiUrlInChatRoomsArr(action.payload),
          state.firebaseData
        ),
        loading: { ...state.loading, getAllChatRooms: false },
      };
    case GET_ALL_CHAT_ROOMS_FAILED:
      return {
        ...state,
        loading: { ...state.loading, getAllChatRooms: false },
        error: { ...state.error, getAllChatRooms: action.payload },
      };
    case ADD_NEW_MESSAGES:
      return {
        ...state,
        newMessagesObj: addNewMessage(state.newMessagesObj, action.payload),
      };
    case CLEAR_RECEIVED_MESSAGES:
      return {
        ...state,
        newMessagesObj: deleteReceivedMessages(
          state.newMessagesObj,
          action.payload
        ),
      };
  }
  return state;
};
