import React, { Fragment } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import store from './redux/store'
import Home from './pages/Home'
import Auth from './pages/Auth'

function App() {
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
