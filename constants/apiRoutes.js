export const API_URL = 'http://localhost:4000/api';
export const apiRoutes = {
  USER_SIGNUP: '/user/signup',
  USER_SIGNIN: '/user/signin',
  UPDATE_USER: '/user/updateuser',
  VERIFY_EMAIL: '/user/verfiyEmail',
  VERIFY_ADMIN: '/user/verfiyAdmin',
  FORGORT_PASSWORD: '/user/forgotpassword',
  VERIFY_PIN: '/user/verifypin',
  CREATE_RECORD: '/record/createrecord',
  UPDATE_RECORD: '/record/updaterecord',
  SEND_INQUIRY_MESSAGE: '/record/createinquirymessage',
  GET_ALL_RECORDS: '/record/allrecords',
  GET_ALL_RECORDS_WITH_INQUIRIES: '/record/allrecordswithinquiries',
  GET_ALL_MESSAGES: '/record/allmessages',
  CREATE_TRANSPORT_REQUEST: '/transport/createtransportrequest',
  ALL_TRANSPORT_REQUESTS: '/transport/alltransportrequests',
  SEND_TRANSPORT_MESSAGE: '/transport/sendtransportmessage',
  UPLOAD_RECORD_FILE:'/record/uploadrecordfile',
  GET_CHAT_ROOM:'/chatRoom/singlechatroom',
  GET_ALL_CHAT_ROOMS:'/chatRoom/allchatrooms'
};
