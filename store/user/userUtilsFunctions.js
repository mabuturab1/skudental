import { API_URL } from '../../constants/apiRoutes';
export const addApiUrlInUserObj = (user) => {
  return {
    ...user,
    profileImageUrl: user.profileImageUrl
      ? API_URL + '/' + user.profileImageUrl
      : undefined,
  };
};
