import { Platform } from 'react-native';
import jwt_decode from 'jwt-decode';
import { tokenExpirationMarginMillis } from '../constants/UIConstants';
export const isAndroid = () => Platform.OS === 'android';
export const isUserAuthenticated = (token) => {
  if (token) {
    const decoded = jwt_decode(token);
    return Date.now() < decoded.exp * 1000 - tokenExpirationMarginMillis - 4000;
  }
  return false;
};
export const isUserVerified = (user) => user?.role?.verifiedByAdmin;

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
      firebaseObject[key] = value.toDate();
    }
  }
  return firebaseObject;
};

export const insertItem = (array, item, index) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const removeItem = (array, index) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const updateObjectInArray = (array, updatedItem, newIndex) => {
  return array.map((item, index) => {
    if (index !== newIndex) {
      // This isn't the item we care about - keep it as-is
      return item;
    }
    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...updatedItem,
    };
  });
};

export const getArrayCopy = (items = []) => {
  return items.map((el) => ({ ...el }));
};
