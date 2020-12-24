import axios from 'axios';
import {
  apiRoutes,
  API_URL,
} from '../../constants/apiRoutes';
import {
  getAxiosConfig,
  getServerResponseData,
  isValidServerResponse,
} from '../../helpers/Utils';
import { io } from 'socket.io-client';
import { isSuccessDefault } from '../../constants/UIConstants';
import { chatRoomsCollection } from '../../helpers/firebase/Firebase';
let socket = io({ autoConnect: false });
export const GET_ALL_CHAT_ROOM_MESSAGES_START =
  'GET_ALL_CHAT_ROOM_MESSAGES_START';
export const GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS =
  'GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS';
export const GET_ALL_CHAT_ROOM_MESSAGES_FAILED =
  'GET_ALL_CHAT_ROOM_MESSAGES_FAILED';
export const GET_ALL_CHAT_ROOMS_START = 'GET_ALL_CHAT_ROOMS_START';
export const GET_ALL_CHAT_ROOMS_SUCCESS = 'GET_ALL_CHAT_ROOMS_SUCCESS';
export const GET_ALL_CHAT_ROOMS_FAILED = 'GET_ALL_CHAT_ROOMS_FAILED';

export const GET_ALL_CHAT_ROOMS_DATA_SUCCESS = 'GET_ALL_CHAT_ROOMS_DATA_SUCCESS';

export const SEND_MESSAGE_START = 'SEND_MESSAGE_START';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
export const ADD_NEW_MESSAGES = 'ADD_NEW_MESSAGES';
export const CLEAR_RECEIVED_MESSAGES = 'CLEAR_RECEIVED_MESSAGES';

export const getAllChatRoomsDataSuccess = (payload) => ({
  type: GET_ALL_CHAT_ROOMS_DATA_SUCCESS,
  payload,
});



const getAllChatRoomMessagesStart = () => ({
  type: GET_ALL_CHAT_ROOM_MESSAGES_START,
});
export const getAllChatRoomMessagesSuccess = (payload) => ({
  type: GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS,
  payload,
});
const getAllChatRoomMessagesFailed = (error = '') => ({
  type: GET_ALL_CHAT_ROOM_MESSAGES_FAILED,
  error,
});
const getAllChatRoomsStart = () => ({
  type: GET_ALL_CHAT_ROOMS_START,
});
 const getAllChatRoomsSuccess = (payload) => ({
  type: GET_ALL_CHAT_ROOMS_SUCCESS,
  payload,
});
const getAllChatRoomsFailed = (error = '') => ({
  type: GET_ALL_CHAT_ROOMS_FAILED,
  error,
});

export const addNewMessage = (payload) => ({
  type: ADD_NEW_MESSAGES,
  payload,
});

export const clearReceivedMessages = (payload) => ({
  type: CLEAR_RECEIVED_MESSAGES,
  payload,
});

export const connectSocketIo = (token) => {
  // console.log('starting connection with sokcket io');
  // socket = io(BASE_URL_IP, {
  //   extraHeaders: { Authorization: `Bearer ${token}` },
  // });
  // socket.open();
};
export const disConnectSocketIo = (token) => {
  // socket.disconnect();
};
socket.on('connect', () => {
  console.log('socket connected', socket.id);
});

export const getSocket=()=>socket;

export const getAllChatRoomMessages = (id, callback) => {
  return async (dispatch, getState) => {
    try {
      
      dispatch(getAllChatRoomMessagesStart());
      const doc= chatRoomsCollection.doc(id).get();
      if (doc.exists) {
        dispatch(
          getAllChatRoomMessagesSuccess(doc.data())
        );
      } else if (response.error) {
        dispatch(getAllChatRoomMessagesFailed(response.error));
      }
    } catch (error) {
      console.log('error in single chat room', error);
      dispatch(getAllChatRoomMessagesFailed('An error occurred'));
    }
  };
};

export const getAllChatRooms = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(getAllChatRoomsStart());
      const response = await axios.post(
        API_URL + apiRoutes.GET_ALL_CHAT_ROOMS,
        {},
        {
          ...getAxiosConfig(getState),
        }
      );

      if (isValidServerResponse(response)) {
        dispatch(getAllChatRoomsSuccess(getServerResponseData(response)));
      } else if (response.error) {
        dispatch(getAllChatRoomsFailed(response.error));
      }
    } catch (error) {
      console.log('error in fetching all rooms', error);
      dispatch(getAllChatRoomsFailed('An error occurred'));
    }
  };
};

export const sendMessages = ( chatRoomId, messageObj, isSuccess=isSuccessDefault) => {
  return async (dispatch) => {
    try {
     socket.emit('message',chatRoomId, messageObj, isSuccess);
    } catch (error) {
      dispatch(sendMessagesFailed('An error occurred'));
    }
  };
};