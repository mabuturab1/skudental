import React, { useCallback, useEffect, Fragment } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert } from '../../store/actions';

const ShowAlert = (props) => {
  const dispatch = useDispatch();
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
    console.log('running alert useeffect')
    if (alertArr.length) {
      createAlert(alertArr[0]);
    }
  }, [createAlert, alertCount, alertArr]);
  return <Fragment></Fragment>;
};

export default ShowAlert;
