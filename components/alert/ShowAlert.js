import React, { useState, useCallback, useEffect, Fragment } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert, clearAllAlerts } from '../../store/actions';

const ShowAlert = (props) => {
  const dispatch = useDispatch();
  const [appInitiated, setAppInitiated] = useState(false);
  const { alertCount, alertArr } = useSelector(({ alert }) => ({
    alertCount: alert.alertCount,
    alertArr: alert.alertArr,
  }));
  const createAlert = useCallback(
    ({ title = 'Alert', message = 'An error occurred', id }) =>
      Alert.alert(
        title,
        message,
        [{ text: 'OK', onPress: () => dispatch(clearAlert(id)) }],
        { cancelable: false }
      ),
    []
  );
  useEffect(() => {
    dispatch(clearAllAlerts());
    console.log('clearing all alerts');
  }, []);
  useEffect(() => {
    console.log('alert arr is', alertArr)
    if (!appInitiated && !alertArr.length) setAppInitiated(true);
  }, [alertArr]);
  useEffect(() => {
    console.log('app initiated is', appInitiated)
    if (!appInitiated) return;
    if (alertArr.length) {
      console.log('creating alert')
      createAlert(alertArr[0]);
    }
  }, [createAlert, alertCount, alertArr, appInitiated]);
  return <Fragment></Fragment>;
};

export default ShowAlert;
