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

// Logout / Clear Profile
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