// import React, {Component} from 'react';
import React, { useEffect } from 'react';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Editor from "../components/editor/Editor"
import Navbar from '../components/navbar/Navbar';



import Registration from "../components/authorization/Registration";
import Login from "../components/authorization/Login";
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../actions/user';


function App() {
// class App extends Component {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar>

        </Navbar>
        <div className="wrap">
          {!isAuth &&
          <Routes>
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="x-app" element={<Editor />} />
          </Routes>
          }
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
