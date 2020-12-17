import {
  GET_ALL_CHAT_ROOM_MESSAGES_START,
  GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS,
  GET_ALL_CHAT_ROOM_MESSAGES_FAILED,
  GET_ALL_CHAT_ROOMS_START,
  GET_ALL_CHAT_ROOMS_SUCCESS,
  GET_ALL_CHAT_ROOMS_FAILED,
  ADD_NEW_MESSAGE,
} from './actions';

const initialState = {
  allChatRooms: [],
  loading: {
    getChatRoomMessages: false,
  },
  error: {
    getChatRoomMessages: '',
  },
};

const addNewMessage = (allChatRooms, payload) => {
  let newChatRooms = allChatRooms.map((el) => ({ ...el }));
  let currentRoomIndex = newChatRooms.findIndex(
    (el) => el._id === payload.chatRoomId
  );
  if (currentRoomIndex < 0) return newChatRooms;
  newChatRooms[currentRoomIndex].messages.push(payload);
  return newChatRooms;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CHAT_ROOM_MESSAGES_START:
      return {
        ...state,
        loading: { ...state.loading, createTransportRequest: true },
        error: { ...state.error, createTransportRequest: '' },
      };
    case GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS:
      return {
        ...state,
        allChatRooms: state.allChatRooms
          .filter((el) => el._id !== action.payload._id)
          .concat(action.payload)
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
        loading: { ...state.loading, createTransportRequest: true },
        error: { ...state.error, createTransportRequest: '' },
      };
    case GET_ALL_CHAT_ROOMS_SUCCESS:
      return {
        ...state,
        allChatRooms: action.payload,
        loading: { ...state.loading, getAllChatRoomMessages: false },
      };
    case GET_ALL_CHAT_ROOMS_FAILED:
      return {
        ...state,
        loading: { ...state.loading, getAllChatRoomMessages: false },
        error: { ...state.error, getAllChatRoomMessages: action.payload },
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        allChatRooms: addNewMessage(state.allChatRooms, action.payload),
      };
  }
  return state;
};
