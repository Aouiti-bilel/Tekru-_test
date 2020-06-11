import React from 'react';
import { Provider } from 'react-redux'
import store from './redux/store'
import Home from './pages/Home'
import Auth from './pages/Auth'

function App() {
  return (
    <Provider store={store}> 
      <div className="App">
       <Auth/>
       <Home/>
      </div>
    </Provider>
  );
}

export default App;
