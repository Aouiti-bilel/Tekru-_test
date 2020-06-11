import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

//Register New User 
export const register =(formData) => async dispatch => {
    const res = await axios.post('/users/register', formData);
    try {
         dispatch({
             type: "REGISTER_SUCCESS",
             payload: res.data
         });

    } catch (err) {
        console.log(err)
    }
}
// Login User  
export const login = (formData) => async dispatch => {
   
    try {
        const res = await axios.post('/users/login',formData);
        dispatch({
          type : "LOGIN_SUCCESS",
          payload: res.data
  });
 
    } catch (err) {
      console.log(err)
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
        console.log(err.msg)
    }
}
export const getUsers = () => async dispatch => {
  
     const res = await axios.get('/users/all')
    try {
        dispatch({
            type: "GET_USERS",
            payload: res.data
        });
    } catch (error) {
        
    }
}
// Get Product
export const deleteUser = id => async dispatch => {
    console.log(id)
    try {
        const res = await axios.delete(`/users/user/${id}`);
        dispatch({
            type: "DELETE_USER",
            payload: id
        });
    } catch (err) {
        console.log(err)
    }
};