import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import firebase from './firebase'
import './global.css';

import Home from './components/Home';
import Header from './components/Header';
import Login from './components/Login/index';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import New from './components/New';
import Edit from './components/Edit';


function App() {

  const [state, setState] = useState({
    firebaseInitialized: false
  });

  useEffect(() => {
    firebase.isInitialized().then(result => {
      // devolve o usuário
      setState({ firebaseInitialized: result })
    })
  },[])

  return state.firebaseInitialized !== false ? (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard/new" component={New} />
        <Route exact path="/dashboard/edit" component={Edit} />
      </Switch>
    </BrowserRouter>
  ) : (
    <h1>Carregando...</h1>
  )
}

export default App;
