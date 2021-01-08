export const SHOW_ALERT_MESSAGE = 'SHOW_ALERT_MESSAGE';
export const CLEAR_ALERT_MESSAGE = 'CLEAR_ALERT_MESSAGE';
export const CLEAR_ALL_ALERTS = 'CLEAR_ALL_ALERTS';
export const showAlert = (title, message) => {
  return {
    type: SHOW_ALERT_MESSAGE,
    payload: { title, message },
  };
};

export const clearAlert = (payload) => {
  return {
    type: CLEAR_ALERT_MESSAGE,
    payload,
  };
};

export const clearAllAlerts = () => {
  return {
    type: CLEAR_ALL_ALERTS,
  };
};
