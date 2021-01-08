import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { chatRoomsCollection } from '../../helpers/firebase/Firebase';
import { getAllChatRoomsDataSuccess } from '../../store/actions';
import { convertFirebaseChatRoomsData } from '../../store/chatRoom/chatRoomUtilsFunctions';
const ChatRoomsListener = ({ children }) => {
  const userId = useSelector(({ auth }) => auth?.user?._id);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userId) return;
    const subscriber = chatRoomsCollection
      .where('members', 'array-contains', userId)
      .onSnapshot((snapshot) => {
        if (snapshot && !snapshot.empty) {
          const convertedData = convertFirebaseChatRoomsData(snapshot);
          dispatch(getAllChatRoomsDataSuccess(convertedData));
        }
      });
    return () => subscriber();
  }, [dispatch, userId]);
  return <Fragment>{children}</Fragment>;
};
export default ChatRoomsListener;
