import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import RegisterForm from "../Components/RegisterForm";
import LoginForm from "../Components/LoginForm";
import NotFoundPage from '../Components/NotFoundPage';
import Header from '../Components/Header';
import Home from '../Components/Home';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/register" component={RegisterForm}/>
        <Route path="/login" component={LoginForm}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;