// import './components/style/App.css'
import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Layout from './components/nav/Layout'
import HomeView from './views/HomeView'
import FooditemsView from './views/FooditemsView'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import MyRestaurantsView from './views/MyRestaurantsView'
import MyRestaurant from './components/restaurants/MyRestaurant'
import MailboxView from './views/MailboxView'
import MyUserProfileView from './views/MyUserProfileView'
import { FooditemContextProvider } from './context/fooditemContext'
import { AuthContextProvider, AuthContext } from './context/authContext'
import { ThemeContextProvider } from './context/themeContext'
import MyFoodalertsView from './views/MyFoodalertsView'
import FoodalertsView from './views/FoodalertsView'
import MyFooditemsView from './views/MyFooditemsView'


// console.log(`process.env.REACT_APP_GOOGLE_API_KEY`, process.env.REACT_APP_GOOGLE_API_KEY)
const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('rest:', rest)
  const { user } = useContext(AuthContext)
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
        <AuthContextProvider>
          <Router>
            <Layout>
              <FooditemContextProvider>
                <Switch>
                  <Route exact path='/'>
                    <HomeView />
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
                  <PrivateRoute component={MyRestaurantsView} exact path='/users/profile/restaurants' />
                  <PrivateRoute component={MyRestaurant} exact path={`/users/profile/restaurants/:rid`} />
                  <PrivateRoute component={MyFoodalertsView} exact path={`/users/profile/restaurants/foodalerts/:rid`} />
                  <PrivateRoute component={MyFooditemsView} exact path={`/users/profile/restaurants/fooditems/:rid`} />
                  <PrivateRoute component={MailboxView} exact path={`/users/profile/restaurants/messages/:rid`} />
                </Switch>
              </FooditemContextProvider>
            </Layout>
          </Router>
        </AuthContextProvider>
      </ThemeContextProvider>
    </div>
  )
}

export default App
