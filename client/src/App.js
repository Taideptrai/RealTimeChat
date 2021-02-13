import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';


const App = () =>{
    return(
        <Router>
            <Route path="/" exact component={Join}></Route>
            <Route path="/chat" component={Chat}></Route>
        </Router>
    )
}
export default App;

