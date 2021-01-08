import {
  SHOW_ALERT_MESSAGE,
  CLEAR_ALERT_MESSAGE,
  CLEAR_ALL_ALERTS,
} from './actions';

const initialState = {
  alertCount: 0,
  alertArr: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT_MESSAGE:
      const errorIndex = state.alertArr.findIndex(
        (el) =>
          el.title === action.payload.title &&
          el.message === action.payload.message
      );
      if (state.alertArr.length > 0 && errorIndex >= 0) return state;
      return {
        ...state,
        alertCount: state.alertCount + 1,
        alertArr: state.alertArr.concat({
          ...action.payload,
          id: state.alertCount,
        }),
      };

    case CLEAR_ALERT_MESSAGE:
      return {
        ...state,
        alertArr: state.alertArr.filter((el) => el.id !== action.payload),
      };
    case CLEAR_ALL_ALERTS:
      return {
        ...state,
        alertArr: [],
      };
  }
  return state;
};
