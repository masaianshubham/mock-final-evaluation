import {
  GETPATIENTFAILURE,
  GETPATIENTREQUEST,
  GETPATIENTSUCCESS,
  ADDPATIENTFAILURE,
  ADDPATIENTREQUEST,
  ADDPATIENTSUCCESS,
  DELETEPATIENTFAILURE,
  DELETEPATIENTREQUEST,
  DELETEPATIENTSUCCESS
} from "./actionTypes";
import axios from 'axios'

export const getPatientRequest = () => ({
    type: GETPATIENTREQUEST
})
export const getPatientSuccess = (payload) => ({
    type: GETPATIENTSUCCESS,
    payload
})

export const getPatientFailure = (payload) => ({
    type: GETPATIENTFAILURE,
    payload
})

export const getPatient = (payload,page,filter,sort) => (dispatch) => {
    console.log(filter)
    dispatch(getPatientRequest())
    axios
    .get(`http://localhost:5000/getpatient/${payload}?page=${page}&gender=${filter}&sort=${sort}`)
    .then((res)=> dispatch(getPatientSuccess(res.data)))
    .catch((err) => dispatch(getPatientFailure(err.response.data)))
}


export const addPatientRequest = () => ({
    type: ADDPATIENTREQUEST
})
export const addPatientSuccess = (payload) => ({
    type: ADDPATIENTSUCCESS,
    payload
})

export const addPatientFailure = (payload) => ({
    type: ADDPATIENTFAILURE,
    payload
})

export const addPatient = (id,payload) => (dispatch) => {
    dispatch(addPatientRequest())
    axios
    .post(`http://localhost:5000/addpatient`,payload)
    .then((res)=> dispatch(getPatient(id)))
    .catch((err) => dispatch(addPatientFailure(err.response.data)))
}

export const deletePatientRequest = () => ({
    type: DELETEPATIENTREQUEST
})
export const deletePatientSuccess = (payload) => ({
    type: DELETEPATIENTSUCCESS,
    payload
})

export const deletePatientFailure = (payload) =>({
    type: DELETEPATIENTFAILURE,
    payload
})

export const deletePatient = (id,userId) => (dispatch) => {
    dispatch(deletePatientRequest())
    axios
    .delete(`http://localhost:5000/deletepatient/${id}`)
    .then((res)=> dispatch(getPatient(userId)))
    .catch((err) => dispatch(deletePatientFailure(err)))
}

