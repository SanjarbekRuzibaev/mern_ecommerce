import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import NotFound from "../components/notFound/NotFound";
import Season from "./Season";
import { fetchCategories } from "../apis/categories";

const HomeScreen = () => {
  const location = useLocation();
  const filters = ["Low to High", "High to Low"];
  const [activeFilter, setActiveFilter] = useState("");
  const initialCategory =
    location.state && location.state.name ? location.state.name : "all";
  const [category, setCategory] = useState(initialCategory);
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;
  const [priceFilter, setPriceFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  //there is need of selector to display it in the frontend
  const productList = useSelector((state) => state.productList);
  //destructure - what we want from product list
  const { loading, error, products, page, pages } = productList;

  //it's fireoff the action that will get the products
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]); //if i do any action then it can also call their inner code by defining here

  const handleCatClick = (cat) => {
    setCategory(cat);
  };
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    sortProductsByPrice(filter === "Low to High" ? "asc" : "desc");
  };

  const sortProductsByPrice = (order) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    setFilteredProducts(
      category === "all"
        ? products.reverse()
        : products.filter(
            (product) =>
              product.category.toLowerCase() === category.toLocaleLowerCase(),
          ),
    );
  }, [category, products]);

  const sortedProducts =
    priceFilter !== ""
      ? [...filteredProducts].sort((a, b) => {
          return priceFilter === "asc" ? a.price - b.price : b.price - a.price;
        })
      : filteredProducts;

  useEffect(() => {
    fetchCategories(setCategories);
  }, []);

  useEffect(() => {
    if (location.state && location.state.name) {
      setCategory(location.state.name);
    }
  }, [location.state]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <></>
      ) : (
        // <ProductCarousel />
        <Link to='/dashboard' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <Season />
      <div className='productHeader'>
        <h1 className='latestHeading'>Latest Products</h1>
        <div
          className={`categories ${category === "all" ? "activeCat" : ""}`}
          onClick={() => {
            setActiveFilter("");
            handleCatClick("all");
          }}
        >
          <span>All</span>
        </div>
        {categories.map((cat) => (
          <div
            className={`categories ${category === cat.name ? "activeCat" : ""}`}
            onClick={() => {
              setActiveFilter("");
              handleCatClick(cat.name);
            }}
          >
            <span>{cat.name}</span>
          </div>
        ))}
        <div className='price-filters'>
          {filters.map((filter) => (
            <label
              className={`price-filter-label ${
                activeFilter === filter ? "activeFilter" : ""
              }`}
              onClick={() => handleFilterClick(filter)}
            >
              <input type='radio' />
              {filter}
            </label>
          ))}
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {sortedProducts.length ? (
              sortedProducts.map((product) => (
                // if i remove this key={product._id} then it will show me an error of each list child should have key prop
                // can use sm={12} md={6} lg={4} xl={3} for styling
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  {/* This is prop it will will pass the product to the Product component */}
                  <Product product={product} />
                </Col>
              ))
            ) : (
              <NotFound />
            )}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}

      {/* <Outlet />   */}
    </>
  );
};

export default HomeScreen;
