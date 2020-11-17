import React, { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import Login from './Login';
function App() {
  const user = useSelector(selectUser)

  //detect if device width is < 700px
  const [width, setWidth] = useState(window.innerWidth);
  function handleWindowSizeChange() {
          setWidth(window.innerWidth);
      }
  useEffect(() => {
          window.addEventListener('resize', handleWindowSizeChange);
          return () => {
              window.removeEventListener('resize', handleWindowSizeChange);
          }
      }, []);
  let mobile = width < 700

  //if there is a user show the app else show login page
  return (
    <div className="app">
    {
      user ? 
      <Router>
        <Switch>
          {/* if desktop show both chat and sidebar else just one (sidebar first) */}
          <Route path="/chat">
            {
              (!mobile) &&
              <Sidebar />
            }
            <Chat mobile={mobile}/>
          </Route>
          <Route path='/'>
            <Sidebar />
            {
              (!mobile ) &&
              <Chat />
            }
          </Route>
        </Switch>
      
    </Router> 
    :
    <Login />
    }
  </div>
  );
}

export default App;
