import axios from 'axios';
import {
  apiRoutes,
  API_URL,
  BASE_URL,
  BASE_URL_IP,
} from '../../constants/apiRoutes';
import { getAxiosConfig } from '../../helpers/Utils';
import { io } from 'socket.io-client';
let socket;
export const GET_ALL_CHAT_ROOM_MESSAGES_START =
  'GET_ALL_CHAT_ROOM_MESSAGES_START';
export const GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS =
  'GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS';
export const GET_ALL_CHAT_ROOM_MESSAGES_FAILED =
  'GET_ALL_CHAT_ROOM_MESSAGES_FAILED';
export const GET_ALL_CHAT_ROOMS_START = 'GET_ALL_CHAT_ROOMS_START';
export const GET_ALL_CHAT_ROOMS_SUCCESS = 'GET_ALL_CHAT_ROOMS_SUCCESS';
export const GET_ALL_CHAT_ROOMS_FAILED = 'GET_ALL_CHAT_ROOMS_FAILED';

export const SEND_MESSAGE_START = 'SEND_MESSAGE_START';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
export const ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE';

const getAllChatRoomMessagesStart = () => ({
  type: GET_ALL_CHAT_ROOM_MESSAGES_START,
});
const getAllChatRoomMessagesSuccess = (payload) => ({
  type: GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS,
  payload,
});
const getAllChatRoomMessagesFailed = (error = '') => ({
  type: GET_ALL_CHAT_ROOM_MESSAGES_FAILED,
  error,
});
const getAllChatRoomsStart = () => ({
  type: GET_ALL_CHAT_ROOM_MESSAGES_START,
});
const getAllChatRoomsSuccess = (payload) => ({
  type: GET_ALL_CHAT_ROOM_MESSAGES_SUCCESS,
  payload,
});
const getAllChatRoomsFailed = (error = '') => ({
  type: GET_ALL_CHAT_ROOM_MESSAGES_FAILED,
  error,
});
const sendMessageStart = () => ({
  type: SEND_MESSAGE_START,
});
const sendMessageSuccess = (payload) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload,
});
const sendMessageFailed = (error = '') => ({
  type: SEND_MESSAGE_FAILED,
  error,
});
const addNewMessage = (payload) => ({
  type: ADD_NEW_MESSAGE,
  payload,
});

export const connectSocketIo = (token) => {
  // console.log('starting connection with sokcket io');
  // socket = io(BASE_URL_IP, {
  //   extraHeaders: {  Authorization: `Bearer ${token}`, },
  // });
  // socket.on('connect',()=>{
  //   console.log('socket connected', socket.id);
  // })
};

export const getAllChatRoomMessages = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(getAllChatRoomMessagesStart());
      const response = await axios.get(
        API_URL + apiRoutes.GET_CHAT_ROOM + '/' + id,
        {
          ...getAxiosConfig(getState),
        }
      );
      if (isValidServerResponse(response)) {
        dispatch(
          getAllChatRoomMessagesSuccess(getServerResponseData(response))
        );
      } else if (response.error) {
        dispatch(getAllChatRoomMessagesFailed(response.error));
      }
    } catch (error) {
      dispatch(getAllChatRoomMessagesFailed('An error occurred'));
    }
  };
};

export const getAllChatRooms = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(getAllChatRoomsStart());
      const response = await axios.get(
        API_URL + apiRoutes.GET_ALL_CHAT_ROOMS + '/' + id,
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
      dispatch(getAllChatRoomsFailed('An error occurred'));
    }
  };
};
