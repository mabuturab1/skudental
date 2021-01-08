import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRefreshToken } from '../../store/actions';
import { useRef } from 'react';
import jwt_decode from 'jwt-decode';
import { LogBox } from 'react-native';
import { tokenExpirationMarginMillis } from '../../constants/UIConstants';
const AutoLogin = () => {
  const token = useSelector(({ auth }) => auth.token);
  const dispatch = useDispatch();
  const timeout = useRef(null);
  useEffect(() => {
    LogBox.ignoreLogs(['Setting a timer']);
    if (!token) return;
    if (timeout.current) clearTimeout(timeout.current);
    const decoded = jwt_decode(token);
    const expirationTime =
      decoded.exp * 1000 - Date.now() - tokenExpirationMarginMillis;
    if (expirationTime < 0) {
      return;
    }
    timeout.current = setTimeout(() => {
      dispatch(userRefreshToken());
    }, expirationTime);
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [token]);
  return <Fragment></Fragment>;
};
export default AutoLogin;
