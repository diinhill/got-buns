import React, { useContext } from "react"
import { useHistory } from 'react-router-dom'
import { Link } from "react-router-dom"
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap"
import { AuthContext } from '../../context/AuthContext'



function ScrollTransparentNavbar() {

  const { user } = useContext(AuthContext)
  const history = useHistory()

  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [navbarColor, setNavbarColor] = React.useState(
    (document.documentElement.scrollTop > 499 || document.body.scrollTop) > 499
      ? ""
      : " navbar-transparent"
  );
  const [buyButtonColor, setBuyButtonColor] = React.useState(
    (document.documentElement.scrollTop > 499 || document.body.scrollTop) > 499
      ? "info"
      : "neutral"
  );

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 499 ||
        document.body.scrollTop > 499
      ) {
        setNavbarColor("");
        setBuyButtonColor("info");
      } else if (
        document.documentElement.scrollTop < 500 ||
        document.body.scrollTop < 500
      ) {
        setNavbarColor(" navbar-transparent");
        setBuyButtonColor("neutral");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open")
            setCollapseOpen(false)
          }}
        />
      ) : null}
      <Navbar className={"fixed-top" + navbarColor} color="white" expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavItem>
              <Button
                className="nav-link btn-default left"
                color={buyButtonColor}
                onClick={() => history.goBack()}
              >
                {/* <p>  */}
                {'<<<'}
                {/* </p> */}
              </Button>
            </NavItem>
            <NavbarBrand to="/users/profile" tag={Link} id="navbar-brand" >
              HOME
            </NavbarBrand>
            <UncontrolledTooltip target="navbar-brand">
              buns buns buns
            </UncontrolledTooltip>
            <button
              onClick={() => {
                document.documentElement.classList.toggle("nav-open")
                setCollapseOpen(!collapseOpen)
              }}
              aria-expanded={collapseOpen}
              className="navbar-toggler"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse isOpen={collapseOpen} navbar>
            <Nav className="ml-auto" id="ceva" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  // href="#pablo"
                  id="navbarDropdownMenuLink1"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  {/* <i className="now-ui-icons design_app"></i> */}
                  <p>buns</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink1" right>
                  <DropdownItem to='/restaurants' tag={Link}>
                    {/* <i className="now-ui-icons design_image"></i> */}
                    Restaurants
                  </DropdownItem>
                  <DropdownItem to='/users/profile' tag={Link}>
                    {/* <i className="now-ui-icons business_chart-pie-36"></i> */}
                    Food Items
                  </DropdownItem>
                  <DropdownItem /* to='/restaurants/fooditems/all' tag={Link} */>
                    {/* <i className="now-ui-icons business_chart-pie-36"></i> */}
                    Current Food Alerts
                  </DropdownItem>
                  {user ?
                    <DropdownItem
                      to='/logout' tag={Link}
                    >
                      {/* <i className="now-ui-icons design_bullet-list-67"></i> */}
                      Logout
                    </DropdownItem>
                    : <DropdownItem
                      to='/login' tag={Link}
                    >
                      {/* <i className="now-ui-icons design_bullet-list-67"></i> */}
                      Sign In
                    </DropdownItem>}
                </DropdownMenu>
              </UncontrolledDropdown>


              <NavItem>
                <Button
                  className="nav-link btn-default"
                  color={buyButtonColor}
                  // href="https://www.creative-tim.com/product/now-ui-kit-pro-react?ref=nuk-pro-react-scroll-transparent-navbar"
                  target="_blank"
                >
                  <p>BunAlert!</p>
                </Button>
              </NavItem>


            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>

  )
}
export default ScrollTransparentNavbar
