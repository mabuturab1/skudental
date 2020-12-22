import {
  GET_ALL_CHAT_ROOM_MESSAGES_START,
  GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS,
  GET_ALL_CHAT_ROOM_MESSAGES_FAILED,
  GET_ALL_CHAT_ROOMS_START,
  GET_ALL_CHAT_ROOMS_SUCCESS,
  GET_ALL_CHAT_ROOMS_FAILED,
  ADD_NEW_MESSAGES,
  CLEAR_RECEIVED_MESSAGES,
} from './actions';
import {
  addApiUrlInChatRoom,
  addApiUrlInChatRoomsArr,
} from './chatRoomUtilsFunctions';

const initialState = {
  allChatRooms: [],
  newMessagesObj: {},
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
const deleteReceivedMessages = (newMessagesObj, payload) => {
  const chatRoomId = payload.chatRoomId;
  let newUpdatedMessageObj = {};
  Object.keys(newMessagesObj).forEach((el) => {
    newUpdatedMessageObj = {
      ...newUpdatedMessageObj,
      [el]: (newMessagesObj[el] || []).map((mess) => ({ ...mess })),
    };
  });
  let updatedMessages = newUpdatedMessageObj[chatRoomId];
  updatedMessages = updatedMessages
    .map((el) => ({ ...el }))
    .filter((el) => !action.payload.idsArr.includes(el._id));
  updatedMessages.push(payload.messageObj);
  const updated = {
    ...newUpdatedMessageObj,
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
        allChatRooms: state.allChatRooms
          .filter((el) => el._id !== action.payload._id)
          .concat(addApiUrlInChatRoom(action.payload))
          .map((room) => ({ ...room })),
        loading: { ...state.loading, getAllChatRoomMessages: false },
      };
    case GET_ALL_CHAT_ROOM_MESSAGES_FAILED:
      return {
        ...state,
        loading: { ...state.loading, getAllChatRoomMessages: false },
        error: { ...state.error, getAllChatRoomMessages: action.payload },
      };
    case GET_ALL_CHAT_ROOMS_START:
      return {
        ...state,
        loading: { ...state.loading, getAllChatRooms: true },
        error: { ...state.error, getAllChatRooms: '' },
      };
    case GET_ALL_CHAT_ROOMS_SUCCESS:
      return {
        ...state,
        allChatRooms: addApiUrlInChatRoomsArr(action.payload),
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
