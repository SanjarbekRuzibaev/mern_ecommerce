import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  // createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { deleteCategory, fetchCategories } from "../apis/categories";
import moment from "moment";

const CategoryListScreen = () => {
  const [categories, setCategories] = useState([]);
  const { pageNumber } = useParams() || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete, //so that the deleted product gone
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      deleteCategory(id);
    }
  };

  // const createProductHandler = () => {
  //   dispatch(createProduct());
  // };

  useEffect(() => {
    fetchCategories(setCategories);
  }, [categories]);

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Catoegories</h1>
        </Col>
        <Col>
          <Button className='my-3 float-end' onClick={() => navigate("/admin/product")}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
          <Button
            style={{ marginRight: "10px" }}
            className='my-3 float-end bg-danger'
            onClick={() => navigate("/admin/categories")}
          >
            <i className='fas fa-plus'></i> Add Category
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>Created</th>
                <th>Last Updated</th>
                <th>Range</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat._id}</td>
                  <td>{cat.name}</td>
                  <td>{moment(cat.createdAt).format("MM/DD/YYYY")}</td>
                  <td>{moment(cat.updatedAt).format("MM/DD/YYYY")}</td>
                  <td>{cat.priceRange}</td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(cat._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default CategoryListScreen;
