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
