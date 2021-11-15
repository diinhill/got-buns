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
import AddRestaurant from './components/restaurants/AddRestaurant';
import EditRestaurant from './components/restaurants/EditRestaurant';
import UserContextProvider from './context/UserContext';
import EditUserProfile from './components/users/EditUserProfile';
import AddFooditem from './components/fooditems/AddFooditem';


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
        <UserContextProvider>
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

              <Route exact path='/users/profile'>
                <HomeView />
              </Route>
              <Route exact path='/users/profile/edit'>
                <EditUserProfile />
              </Route>
              <Route exact path='/users/profile/restaurants/add'>
                <AddRestaurant />
              </Route>
              <Route exact path={`/users/profile/restaurants/:rid`}>
                <MyRestaurantView />
              </Route>
              <Route exact path={`/users/profile/restaurants/edit/:rid`}>
                <EditRestaurant />
              </Route>
              <Route exact path={`/users/profile/restaurants/addfooditem/:rid`}>
                <AddFooditem />
              </Route>
              <Route exact path={`/users/profile/restaurants/:rid/:fid`}
            </Switch>
            {/* <PrivateRoute component={HomeView} exact path='/users/profile/restaurants' />
          <PrivateRoute component={MyRestaurantView} exact path={`/users/profile/restaurants/:rid`} /> */}
          </RestaurantContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </Router>
  )
}

export default App
