import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import AuthContextProvider, { AuthContext } from './context/AuthContext';
import RestaurantContextProvider from './context/RestaurantContext';
import UserContextProvider from './context/UserContext';
import FooditemView from './views/FooditemView';
import ProfileView from './views/ProfileView';
import AddRestaurantView from './views/AddRestaurantView';
import RestaurantView from './views/RestaurantView';
import AddFooditemView from './views/AddFooditemView';
import EditRestaurantView from './views/EditRestaurantView';
import EditFooditemView from './views/EditFooditemView';
import EditUserProfileView from './views/EditUserProfileView';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import AllRestaurantsView from './views/AllRestaurantsView';
import Logout from './components/users/Logout';
import ScrollTransparentNavbar from './components/core/ScrollTransparentNavbar';
import LandingPageView from './views/LandingPageView';


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
            <ScrollTransparentNavbar />
            <Switch>
              <Route exact path='/'>
                <LandingPageView />
              </Route>
              <Route exact path='/restaurants'>
                <AllRestaurantsView />
              </Route>
              <Route exact path='/restaurants/fooditems/all'>
                {/* <AllFooditemsView /> */}
              </Route>

              <Route exact path='/register'>
                <RegisterView />
              </Route>
              <Route exact path='/login'>
                <LoginView />
              </Route>
              <Route exact path='/logout'>
                <Logout />
              </Route>

              <Route exact path='/users/profile'>
                <ProfileView />
              </Route>
              <Route exact path='/users/profile/edit'>
                <EditUserProfileView />
              </Route>
              <Route exact path='/users/profile/restaurants/add'>
                <AddRestaurantView />
              </Route>
              <Route exact path={`/users/profile/restaurants/:rid`}>
                <RestaurantView />
              </Route>
              <Route exact path={`/users/profile/restaurants/edit/:rid`}>
                <EditRestaurantView />
              </Route>
              <Route exact path={`/users/profile/restaurants/addfooditem/:rid`}>
                <AddFooditemView />
              </Route>
              <Route exact path={`/users/profile/restaurants/:rid/fooditems/:fid`}>
                <FooditemView />
              </Route>
              <Route exact path={`/users/profile/restaurants/:rid/fooditems/:fid/edit`}>
                <EditFooditemView />
              </Route>
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
