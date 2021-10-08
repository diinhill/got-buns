// import './components/style/App.css'
import React, { useContext } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Layout from './components/nav/Layout'
import HomeView from './views/HomeView'
import FoodView from './views/FoodView'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import MyRestaurantView from './views/MyRestaurantView'
import MailboxView from './views/MailboxView'
import { FooditemContextProvider } from './context/fooditemContext'
import { AuthContextProvider, AuthContext } from './context/authContext'
import { ThemeContextProvider } from './context/themeContext'


// console.log(`process.env.REACT_APP_GOOGLE_API_KEY`, process.env.REACT_APP_GOOGLE_API_KEY)
const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log('rest:', rest)
  const { authenticateUser } = useContext(AuthContext)
  return (
    <Route {...rest}
      render={props =>
        authenticateUser() ?
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
                      <FoodView />
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
                    <PrivateRoute component={MyRestaurantView} exact path={`/restaurants/:uid-:id`} />
                    <PrivateRoute component={MailboxView} exact path={`/users/:uid/profile/messages`} />
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
