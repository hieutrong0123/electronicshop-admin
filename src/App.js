import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './scss/style.scss';
import {BrowserRouter} from 'react-router-dom';

// Containers
import TheLayout from './containers/TheLayout';

// Pages
import Login from './views/pages/login/Login';
import Register from './views/pages/register/Register';
import Page404 from './views/pages/page404/Page404';
import Page500 from './views/pages/page500/Page500';

// const loading = (
//   <div className="pt-3 text-center">
//     <div className="sk-spinner sk-spinner-pulse"></div>
//   </div>
// )



class App extends Component {

  render() {
    return (
      // <HashRouter>
      //     <React.Suspense fallback={loading}>
      //       <Switch>
      //         <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
      //         <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
      //         <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
      //         <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
      //         <Route path="/" name="Home" render={props => <TheLayout {...props}/>} />
      //       </Switch>
      //     </React.Suspense>
      // </HashRouter>
      <BrowserRouter>
        <Switch>
          <Route path="/login" name="Login Page" exact component={Login} />
          <Route path="/register" name="Register Page" exact component={Register}/>
          <Route path="/404" name="Page 404" exact component={Page404} />
          <Route path="/500" name="Page 500" exact component={Page500} />
          <Route path="/" name="Home" component={TheLayout} />
          <Redirect exact to="/404"/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
