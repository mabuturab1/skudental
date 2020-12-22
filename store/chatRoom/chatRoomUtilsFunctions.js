import { API_URL } from '../../constants/apiRoutes';

export const addApiUrlInChatRoom = (el) => ({
  ...el,
  members: el.members?.map((mem) => ({
    ...mem,
    profileImageUrl: mem.profileImageUrl
      ? API_URL + '/' + mem.profileImageUrl
      : undefined,
  })),
});
export const addApiUrlInChatRoomsArr = (chatRoomsArr = []) => {
  return chatRoomsArr.map((el) => addApiUrlInChatRoom(el));
};
