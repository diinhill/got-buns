// import './components/style/App.css'
import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Layout from './components/nav/Layout'
import LandingView from './views/LandingView'
import MyHomeView from './views/MyHomeView'
import FooditemsView from './views/FooditemsView'
import AddFooditem from './components/fooditems/AddFooditem'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import RestaurantsView from './views/RestaurantsView'
import Restaurant from './components/restaurants/Restaurant'
import MyRestaurant from './components/restaurants/MyRestaurant'
import AddRestaurant from './components/restaurants/AddRestaurant'
import MailboxView from './views/MailboxView'
import MyUserProfileView from './views/MyUserProfileView'
import { PrivaterouteContextProvider, PrivaterouteContext } from './context/privaterouteContext'
// import { AuthContextProvider, AuthContext } from '../../bad components/authContext'
import { ThemeContextProvider } from './context/themeContext'
import MyFoodalertsView from './views/MyFoodalertsView'
import FoodalertsView from './views/FoodalertsView'
import MyFooditemsView from './views/MyFooditemsView'



const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('rest:', rest)
  const { user } = useContext(PrivaterouteContext)
  return (
    <Route {...rest}
      render={props =>
        user ?
          <Component {...props} />
          : <Redirect to='/login' />
      } />
  )
}


function App() {


  return (

    <div className='App'>
      <ThemeContextProvider>
        {/* <AuthContextProvider> */}
        <PrivaterouteContextProvider>
          <Router>
            <Route exact path='/'>
              <LandingView />
            </Route>
            <Switch>
              <Layout>
                <Route exact path='/restaurants'>
                  <RestaurantsView />
                </Route>
                <Route exact path={`/restaurants/:rid`}>
                  <Restaurant />
                </Route>
                <Route exact path='/fooditems'>
                  <FooditemsView />
                </Route>
                <Route exact path='/fooditems'>
                  <FooditemsView />
                </Route>
                <Route exact path='/foodalerts'>
                  <FoodalertsView />
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
                <PrivateRoute component={MyUserProfileView} exact path='/users/profile' />
                <PrivateRoute component={MyHomeView} exact path='/users/profile/restaurants' />
                <PrivateRoute component={AddRestaurant} exact path='/users/profile/restaurants/add' />
                <PrivateRoute component={MyRestaurant} exact path={`/users/profile/restaurants/:rid`} />
                {/* <PrivateRoute component={EditRestaurant} exact path={`/users/profile/restaurants/edit/:rid`} /> */}
                <PrivateRoute component={MyFoodalertsView} exact path={`/users/profile/restaurants/foodalerts/:rid`} />
                <PrivateRoute component={MyFooditemsView} exact path={`/users/profile/restaurants/fooditems/:rid`} />
                <PrivateRoute component={AddFooditem} exact path={`/users/profile/restaurants/fooditems/add/:rid`} />
                <PrivateRoute component={MailboxView} exact path={`/users/profile/restaurants/messages/:rid`} />
              </Layout>
            </Switch>
          </Router>
        </PrivaterouteContextProvider>
        {/* </AuthContextProvider> */}
      </ThemeContextProvider>
    </div>
  )
}

export default App
