import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './redux/store'
import Home from './pages/Home'
import Auth from './pages/Auth'
import { loadUser } from './redux/userActions'
import setAuthToken from './utils/setAuthToken';
if(localStorage.token){
  setAuthToken(localStorage.token)
}
function App() {
 
  useEffect(()=> {
    store.dispatch(loadUser());
  },[])
  return (
    <Provider store={store}> 

         <Router>
            <Fragment>
              <Switch>
                <Route exact path='/' component = {Home}/>
                <Route exact path='/auth' component = {Auth}/>
              </Switch>
            </Fragment>
         </Router>



    </Provider>
  );
}

export default App;
