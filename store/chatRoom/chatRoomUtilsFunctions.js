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
    (el) => payload.chatRoomId === el._id
  );
  if (currentChatRoomIndex < 0) return updatedChatRooms;
  updatedChatRooms[currentChatRoomIndex].messages = payload.messages;
  return updatedChatRooms;
};
export const convertFirebaseChatRoomsData = (snapshot) => {
  const updatedArr = [];
  snapshot.forEach((doc) => {
    updatedArr.push({
      chatRoomFirebaseId: doc.id,
      messages: doc.data().messages,
    });
  });
  return updatedArr;
};

export const updateMultipleChatRooms = (chatRoomsArr, payload) => {
  let updatedChatRooms = getNewCopy(chatRoomsArr);
  payload.forEach((el) => {
    const currentChatRoomIndex = updatedChatRooms.findIndex(
      (room) => el.chatRoomFirebaseId === room.firebaseId
    );
    if (currentChatRoomIndex >= 0) {
      updatedChatRooms[currentChatRoomIndex].messages = el.messages;
    }
  });
  return updatedChatRooms;
};
export const addApiUrlInChatRoomsArr = (chatRoomsArr = []) => {
  return chatRoomsArr
    .filter((el) => el?.members?.length > 1)
    .map((el) => addApiUrlInChatRoom(el));
};
