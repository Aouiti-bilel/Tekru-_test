const initState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    users:  []
}

export default function(state=initState, action){
    const { type, payload } = action
    switch(type){
        case "CURRENT_USER": 
        return {
            ...state,
            isAuthenticated: true,
            loading: false,
            user: payload
        }
        case  "REGISTER_SUCCESS":
            return {
                ...state,
                ...payload,
                loading: false,
                users: [...state.users, payload]
            }
        case "LOGIN_SUCCESS" :
           localStorage.setItem('token', payload.token)   
        return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload.user
        }   
             case 'LOGIN_FAIL':        
             case 'LOGOUT':
           localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false
      };
      case "GET_USERS":
          return{
              ...state,
              users: payload
          }
       case "DELETE_USER" : 
           return {
           ...state,
           users: state.users.filter(user => user.id !== payload),
          
       }
       case "UPDATE_USER" : 
       return {
       ...state,
       users: state.users.map(user => (payload.id === user.id ? payload : user))
   }
        default:
             return state
    }
}