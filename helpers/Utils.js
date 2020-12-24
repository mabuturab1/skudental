import { Platform } from 'react-native';
import jwt_decode from 'jwt-decode';
import { firestore } from './firebase/Firebase';
export const isAndroid = () => Platform.OS === 'android';
export const isUserAuthenticated = (token) => {
  if (token) {
    const decoded = jwt_decode(token);
    return Date.now() < decoded.exp * 1000;
  }
  return false;
};

export const getAxiosConfig = (getState, additionalHeader = {}) => {
  const { auth } = getState();
  return {
    headers: {
      Authorization: `Bearer ${auth.token}`,
      ...additionalHeader,
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

export const isAllValuesValid = (val) => {
  let isAllValuesValid = true;
  val.forEach(
    (el) => (isAllValuesValid = isValidValue(el) && isAllValuesValid)
  );
  return isAllValuesValid;
};

export const isValidValue = (val) => val !== null && val !== undefined;

const isString = (val) => {
  return typeof val === 'string';
};
export const getErrorMessage = (error) => {
  if (isValidValue(error) && isString(error)) return `(${error})`;
  if (isValidValue(error.data) && isString(error.data))
    return `(${error.data})`;
  if (isValidValue(error.message) && isString(error.message))
    return `(${error.message})`;
  return '';
};
export const isValidServerResponse = (response) =>
  response && response?.data?.data;
export const getServerResponseData = (response) => response?.data?.data;

export const convertDate = (firebaseObject) => {
  if (!firebaseObject) return null;

  for (const [key, value] of Object.entries(firebaseObject)) {
    // covert items inside array
    if (value && Array.isArray(value))
      firebaseObject[key] = value.map((item) => convertDate(item));

    // convert inner objects
    if (value && typeof value === 'object') {
      firebaseObject[key] = convertDate(value);
    }
    // convert simple properties
    if (value && value['seconds']) {
      console.log('has property seconds', value.toDate());
      firebaseObject[key] = value.toDate();
    }
  }
  return firebaseObject;
};
