import React, { useState, useCallback, useEffect, Fragment } from 'react';
import Snackbar from 'react-native-snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeColors } from '../../constants/Colors';
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
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_INDEFINITE,
        backgroundColor: ThemeColors.black,
        numberOfLines: 6,
        action: {
          text: 'OK',
          textColor: 'white',
          onPress: () => {
            Snackbar.dismiss();
            dispatch(clearAlert(id));
          },
        },
      }),
    []
  );
  useEffect(() => {
    dispatch(clearAllAlerts());
    
  }, []);
  useEffect(() => {
  
    if (!appInitiated && !alertArr.length) setAppInitiated(true);
  }, [alertArr]);
  useEffect(() => {
 
    if (!appInitiated) return;
    if (alertArr.length) {
      
      createAlert(alertArr[0]);
    }
  }, [createAlert, alertCount, alertArr, appInitiated]);
  return <Fragment></Fragment>;
};

export default ShowAlert;
