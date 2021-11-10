import './App.css'
import 'bulma/css/bulma.css'
import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import LandingPageView from './views/LandingPageView';
import Login from './components/auth/Login';
import HomeView from './views/HomeView';
import RestaurantContextProvider from './context/RestaurantContext';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import MyRestaurantView from './views/MyRestaurantView';


// const PrivateRoute = ({ component: Component, ...rest }) => {
//   console.log('rest:', rest)
//   const { user } = useContext(AuthContext)
//   return (
//     <Route {...rest}
//       render={props =>
//         user ?
//           <Component {...props} />
//           : <Redirect to='/login' />
//       } />
//   )
// }

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <RestaurantContextProvider>
          <Switch>
            <Route exact path='/'>
              <LandingPageView />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/logout'>
              <Logout />
            </Route>

            <Route exact path='/users/profile/restaurants'>
              <HomeView />
            </Route>
            <Route exact path={`/users/profile/restaurants/:rid`}>
              <MyRestaurantView />
            </Route>
          </Switch>
          {/* <PrivateRoute component={HomeView} exact path='/users/profile/restaurants' />
          <PrivateRoute component={MyRestaurantView} exact path={`/users/profile/restaurants/:rid`} /> */}
        </RestaurantContextProvider>
      </AuthContextProvider>
    </Router>
  )
}

export default App
