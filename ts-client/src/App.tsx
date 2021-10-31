import './App.css'
import 'bulma/css/bulma.css'
import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import LandingPage from './layout/LandingPage';
import Login from './components/auth/Login';
import HomeView from './views/HomeView';
import RestaurantContextProvider from './context/RestaurantContext';


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
    <div>
      <AuthContextProvider>
        <RestaurantContextProvider>
          <Router>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route exact path='/users/profile/restaurants'>
              <HomeView />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
          </Router>
        </RestaurantContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
