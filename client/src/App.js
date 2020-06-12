import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './redux/store'
import Home from './pages/Home'

import { loadUser } from './redux/userActions'
import setAuthToken from './utils/setAuthToken';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App() {
 
  useEffect(()=> {
    store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store}> 

         <Router>
            <Fragment>
               <NavBar/>
              <Switch>
                <Route exact path='/' component = {Home}/>
                <Route exact path='/register' component = {Register}/>
                <Route exact path='/login' component = {Login}/>
              </Switch>
            </Fragment>
         </Router>



    </Provider>
  );
}

export default App;
