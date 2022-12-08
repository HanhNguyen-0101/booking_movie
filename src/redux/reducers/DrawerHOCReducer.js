import {
  HIDE_DRAWER,
  SET_CALLBACK_DRAWER,
  SET_CONTENT_DRAWER,
  SET_RESET_CALLBACK_DRAWER,
  SHOW_DRAWER,
} from "../constants/DrawerHOCConstant";

const initialState = {
  isShowing: false,
  title: "",
  FormComponent: <div>123</div>,
  submitAction: () => {},
  resetAction: () => {},
};

export const DrawerHOCReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_DRAWER: {
      return { ...state, isShowing: true };
    }
    case HIDE_DRAWER: {
      return { ...state, isShowing: false };
    }
    case SET_CONTENT_DRAWER: {
      const { title, FormComponent } = payload;
      return { ...state, title, FormComponent };
    }
    case SET_CALLBACK_DRAWER: {
      return { ...state, submitAction: payload.submitAction };
    }
    case SET_RESET_CALLBACK_DRAWER: {
      return { ...state, resetAction: payload.resetAction };
    }
    default:
      return state;
  }
};
