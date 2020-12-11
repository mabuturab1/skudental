import { Platform } from 'react-native';
import jwt_decode from 'jwt-decode';
export const isAndroid = () => Platform.OS === 'android';
export const isUserAuthenticated = (token) => {
  if (token) {
    const decoded = jwt_decode(token);
    return Date.now() < decoded.exp * 1000;
  }
  return false;
};

export const getAxiosConfig = (getState, additionalHeader={}) => {
  const {auth}=getState();
  return {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      ...additionalHeader
    },
  };
};
export const getImageComments = (itemsList = []) => {
  let tempComments = {};
  itemsList.forEach(
    (el, index) => (tempComments[index] = el.additionalComments || '')
  );
  return itemsList;
};
