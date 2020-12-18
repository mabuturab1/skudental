import { SHOW_ALERT_MESSAGE, CLEAR_ALERT_MESSAGE } from './actions';

const initialState = {
  alertCount: 0,
  alertArr: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT_MESSAGE:
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
  }
  return state;
};
