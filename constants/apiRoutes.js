export const BASE_URL_IP = 'http://192.168.10.5:4000';
export const BASE_URL = 'http://localhost:4000';
export const API_URL = BASE_URL + '/api';
export const apiRoutes = {
  USER_SIGNUP: '/user/signup',
  USER_SIGNIN: '/user/signin',
  UPDATE_USER: '/user/updateuser',
  VERIFY_EMAIL: '/user/verfiyEmail',
  VERIFY_USER: '/admin/verifyuser',
  GET_ALL_USERS: '/admin/getallusers',
  UPLOAD_PHOTO: '/user/updateuserphoto',
  FORGORT_PASSWORD: '/user/forgotpassword',
  VERIFY_PIN: '/user/verifypin',
  CREATE_RECORD: '/record/createrecord',
  DELETE_RECORD: '/record/deleterecord',
  DELETE_RECORD_POST: '/record/deleterecordpost',
  UPDATE_RECORD: '/record/updaterecord',
  UPDATE_RECORD_POST: '/record/updaterecordpost',
  SEND_INQUIRY_MESSAGE: '/record/createinquirymessage',
  GET_ALL_RECORDS: '/record/allrecords',
  GET_ALL_RECORDS_WITH_INQUIRIES: '/record/allrecordswithinquiries',
  GET_ALL_MESSAGES: '/record/allmessages',
  CREATE_TRANSPORT_REQUEST: '/transport/createtransportrequest',
  ALL_TRANSPORT_REQUESTS: '/transport/alltransportrequests',
  SEND_TRANSPORT_MESSAGE: '/transport/sendtransportmessage',
  UPLOAD_RECORD_FILE: '/record/uploadrecordfile',
  GET_CHAT_ROOM: '/chatRoom/singlechatroom',
  GET_ALL_CHAT_ROOMS: '/chatRoom/allchatrooms',
};
