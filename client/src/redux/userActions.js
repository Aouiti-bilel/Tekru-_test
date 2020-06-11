import axios from 'axios'

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
