import { API_URL } from '../../constants/apiRoutes';
const getNewCopy = (chatRoomsArr) => {
  return chatRoomsArr.map((el) => ({
    ...el,
    members: el.members?.map((mem) => ({
      ...mem,
    })),
    messages: (el.messages || []).map((message) => ({ ...message })),
  }));
};
export const addApiUrlInChatRoom = (el) => ({
  ...el,
  members: el.members?.map((mem) => ({
    ...mem,
    profileImageUrl: mem.profileImageUrl
      ? API_URL + '/' + mem.profileImageUrl
      : undefined,
  })),
});
export const updateMessageArr = (chatRoomsArr, payload) => {
  let updatedChatRooms = getNewCopy(chatRoomsArr);
  const currentChatRoomIndex = updatedChatRooms.findIndex(
    (el) => payload.chatRoomId
  );
  if (currentChatRoomIndex < 0) return updatedChatRooms;
  updatedChatRooms[currentChatRoomIndex].messages = payload.data.messages;
  return updatedChatRooms;
};
export const addApiUrlInChatRoomsArr = (chatRoomsArr = []) => {
  return chatRoomsArr.map((el) => addApiUrlInChatRoom(el));
};
