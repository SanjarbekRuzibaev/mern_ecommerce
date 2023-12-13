import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import SearchBox from "./SearchBox";
import ProductCarousel from "./ProductCarousel";
import { Link, useLocation } from "react-router-dom";
import { fetchCategories } from "../apis/categories";
const Header = () => {
  const [categories, setCategories] = useState([]);

  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  useEffect(() => {
    fetchCategories(setCategories);
  }, []);

  return (
    <header>
      <Navbar
        className='custom-bg'
        variant='light'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>𝓦𝓸𝓻𝓵𝓭 𝓑𝓻𝓪𝓷𝓭𝓼</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='ms-auto'>
              <LinkContainer className='shopNow' to='/dashboard'>
                <Nav.Link>SHOP NOW</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link className='text-black'>
                  {userInfo && cartItems.length > 0 && (
                    <span className='cartBadge'>{cartItems.length}</span>
                  )}
                  <i className='fas fa-shopping-cart'></i> Your Items
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <div className='navRight'>
                    <NavDropdown title='Categories'>
                      {categories.map((cat) => (
                        <LinkContainer
                          to={`/dashboard/${cat.name}`}
                          state={cat}
                        >
                          <NavDropdown.Item>{cat.name}</NavDropdown.Item>
                        </LinkContainer>
                      ))}
                    </NavDropdown>
                    <NavDropdown title={userInfo.name} id='username'>
                      {userInfo.isAdmin === "true" ? (
                        <>
                          <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to='/admin/categorylist'>
                            <NavDropdown.Item>Categories</NavDropdown.Item>
                          </LinkContainer>
                        </>
                      ) : (
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                      )}
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </div>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {pathname === "/" && <ProductCarousel />}
    </header>
  );
};

export default Header;
