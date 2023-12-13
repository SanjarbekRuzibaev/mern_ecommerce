import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import NewArrived from "./screens/NewArrived";
import Categories from "./screens/Categories";
import CategoryListScreen from "./screens/CategoryListScreen";
import { Toaster } from "react-hot-toast";
import ProductAddScreen from "./screens/ProductAddScreen";
import ProductCarousel from "./components/ProductCarousel";
import Discount from "./screens/Discount";

const App = () => {
  const { pathname } = useLocation();
  return (
    //all the work will be inside an empty element that is called fragment i.e. <> </>
    <>
      <Toaster position='bottom-center' />
      <Header />
      {pathname !== "/" && (
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/admin/orderlist' element={<OrderListScreen />} />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditScreen />}
              />
              <Route
                path='/admin/productlist'
                element={<ProductListScreen />}
              />
              <Route
                path='/admin/categorylist'
                element={<CategoryListScreen />}
              />
              <Route path='/admin/product' element={<ProductAddScreen />} />
              <Route
                path='/admin/productlist/:pageNumber'
                element={<ProductListScreen />}
              />
              <Route path='/admin/categories' element={<Categories />} />
              <Route path='/admin/discount' element={<Discount />} />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
              <Route path='/admin/userlist' element={<UserListScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/login' element={<LoginScreen />} />

              <Route path='product'>
                <Route path=':id' element={<ProductScreen />} />
              </Route>

              <Route path='cart'>
                <Route path=':id' element={<CartScreen />} />
                <Route path='' element={<CartScreen />} />
              </Route>

              <Route path='/search/:keyword' element={<HomeScreen />} />
              {/* <Route path="users/*"></Route>           */}
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomeScreen />}
              />
              <Route path='dashboard'>
                <Route path=':id' element={<HomeScreen />} />
                <Route path='' element={<HomeScreen />} />
              </Route>
              <Route path='/new/arrived' element={<NewArrived />} />
            </Routes>
          </Container>
        </main>
      )}
      <Footer />
    </>
  );
};

export default App;
