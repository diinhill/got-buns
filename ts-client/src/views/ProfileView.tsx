import React, { useContext } from "react";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components

import { useHistory } from "react-router";
import { AuthContext } from "../context/AuthContext";
import RestaurantsList from "../components/restaurants/RestaurantsList";
import HumongousHeader from "../components/core/HumongousHeader";
import defaultAvatar from '../assets/img/plankton.png'
import defaultBgImage from '../assets/img/chumbucket.png'

const ProfileView = () => {

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  }, []);

  const history = useHistory()
  const { user } = useContext(AuthContext)

  const handleAddRestaurant = () => {
    history.push('/users/profile/restaurants/add')
  }
  const handleEditUserProfile = () => {
    history.push('/users/profile/edit')
  }


  return (

    user ?
      <div className="wrapper">
        <HumongousHeader
          backgroundImage={user.restaurants[0]?.photo ? `http://localhost:5000/images/${user.restaurants[0].photo}` : defaultBgImage}
          avatar={user.photo ? `http://localhost:5000/images/${user.photo}` : defaultAvatar}
          title={user.name}
          category={user.profession ? user.profession : ''}
          qty={user.restaurants.length}
          qtyName={user.restaurants.length <= 1 ? 'Restaurant' : 'Restaurants'}
        />
        <div className="section">
          <Container>
            <div className="button-container">
              <Button
                className="btn-round mr-1"
                color="info"
                onClick={handleAddRestaurant}
                size="lg"
              >
                Add Restaurant
              </Button>
              <Button
                className="btn-round btn-icon mr-1"
                color="default"
                onClick={handleEditUserProfile}
                size="lg"
              >
                Edit User Profile
              </Button>

              {/*<UncontrolledTooltip delay={0} target="tooltip871723210">
                Follow me on Twitter
              </UncontrolledTooltip>
              <Button
                className="btn-round btn-icon"
                color="default"
                href="#pablo"
                id="tooltip259363830"
                onClick={(e) => e.preventDefault()}
                size="lg"
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip259363830">
                Follow me on Instagram
              </UncontrolledTooltip>*/}
            </div>
            <h3 className="title">Restaurants</h3>
            {/* <h5 className="description text-center">
               An artist of considerable range, Ryan — the name taken by
               Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
               and records all of his own music, giving it a warm, intimate feel
               with a solid groove structure. An artist of considerable range.
            </h5> */}

            {user && <RestaurantsList allRestaurants={user.restaurants} />}
          </Container>
        </div>
      </div>
      : null
  )
}

export default ProfileView
