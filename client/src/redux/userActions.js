import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import uuid from 'uuid/v4';

//Register New User 
export const register =(formData, history) => async dispatch => {

    try {
        const res = await axios.post('/users/register', formData);
        if(history!='undefined'){
            history.push('/login')
        }
         dispatch({
             type: "REGISTER_SUCCESS",
             payload: res.data
         });

    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }else{
        dispatch(setAlert(err.response.data.msg, 'danger'))
        }
    }
}
// Login User  
export const login = (formData) => async dispatch => {
   
    try {
        const res = await axios.post('/users/login',formData);
        dispatch(loadUser());
        dispatch({
          type : "LOGIN_SUCCESS",
          payload: res.data
  });
 
 
    } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }else{
            dispatch(setAlert(err.response.data.msg, 'danger'))
            }
            dispatch({
                type : "LOGIN_FAIL"
});
    }

}

// Logout 
  export const logout = () => dispatch => {
    dispatch({ type: 'LOGOUT' });
  };

  // Load User (Get Current User)
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/users/current');
        
        dispatch({
            type: "CURRENT_USER",
            payload: res.data
        });
    } catch (err) {

    }
}
export const getUsers = () => async dispatch => {
  
    try {
        const res = await axios.get('/users/all')
        dispatch({
            type: "GET_USERS",
            payload: res.data
        });
    } catch (err) {
       
        const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }else{
        dispatch(setAlert(err.response.data.msg, 'danger'))
    }
    }
}
// Delete User
export const deleteUser = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/users/user/${id}`);
        dispatch({
            type: "DELETE_USER",
            payload: id
        });
    } catch (err) {
       
        const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }else{
        dispatch(setAlert(err.response.data.msg, 'danger'))
    }
 };
}
// Update User
export const updateUser = (formData,id) => async dispatch => {
    try {
        const res = await axios.put(`/users/user/${id}`, formData);
        dispatch({
            type: "UPDATE_USER",
            payload: res.data
        });
    } catch (err) {
        const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }else{
        dispatch(setAlert(err.response.data.msg, 'danger'))
    }
    }
};


export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  const id = uuid();
  dispatch({
    type: 'SET_ALERT',
    payload: { msg, alertType, id }
  });
  setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), timeout);
};