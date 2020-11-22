import { loadData, saveData } from "../localStorage";
import {
  LOGINFAILURE,
  LOGINREQUEST,
  LOGINSUCCESS,
  SIGNUPFAILURE,
  SIGNUPREQUEST,
  SIGNUPSUCCESS,
  LOGOUT
} from "./actionTypes";

export const initState = {
  user: loadData("user") || [],
  error: "",
  isAuth: loadData("isAuth") || false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOGINREQUEST:
      return {
        ...state,
        error: "",
        user: "",
      };
    case LOGINFAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOGINSUCCESS:
      saveData("isAuth", true);
      saveData("user", action.payload);
      return {
        ...state,
        error: "",
        user: action.payload,
        isAuth: true,
      };
    case SIGNUPREQUEST:
      return {
        ...state,
        error: "",
        user: "",
      };
    case SIGNUPFAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case SIGNUPSUCCESS:
      saveData("isAuth", true);
      saveData("user", action.payload);
      return {
        ...state,
        error: "",
        user: action.payload,
        isAuth: true,
      };
    case LOGOUT:
      saveData("isAuth", false)
      saveData("user", [])
      return{
        ...state,
        error: "",
        isAuth: false,
        user: []
      }
    default:
      return state;
  }
};

export default reducer;
