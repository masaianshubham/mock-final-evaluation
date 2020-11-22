import {
    GETPATIENTFAILURE,
    GETPATIENTREQUEST,
    GETPATIENTSUCCESS,
    ADDPATIENTFAILURE,
    ADDPATIENTREQUEST,
    ADDPATIENTSUCCESS
  } from "./actionTypes";

  export const initState = {
    patient:  [],
    error: "",
    totalPage: 1
  }
  
  const reducer = (state = initState, action) => {
    switch (action.type) {
      case GETPATIENTREQUEST:
        return {
          ...state,
          error: "",
          patient: ""
        };
      case GETPATIENTFAILURE:
        return {
          ...state,
          error: action.payload
        };
      case GETPATIENTSUCCESS:
        return {
          ...state,
          error: "",
          patient: action.payload.patient,
          totalPage: action.payload.totalPages
        };
      case ADDPATIENTREQUEST:
        return {
          ...state,
          error: ""
        };
      case ADDPATIENTFAILURE:
        return {
          ...state,
          error: action.payload
        };
      case ADDPATIENTSUCCESS:
        return {
          ...state,
          error: ""
        };
      default:
        return state;
    }
  }
  
  export default reducer