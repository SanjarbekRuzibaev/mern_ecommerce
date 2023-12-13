import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { listProducts, createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
import { fetchCategories } from "../apis/categories";

const ProductAddScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState({});
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

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
      navigate("/admin/productlist");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    //successDelete, //so that the deleted product gone
    successCreate,
    createdProduct,
    //pageNumber,
  ]);

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0]; //for uploading a single file
  //   const formData = new FormData();
  //   formData.append("photos", file);
  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };

  //     const { data } = await axios.post("/api/upload", formData, config);
  //     setImage(data);
  //     setUploading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //   }
  // };

  const onFileChange = (e) => {
    const fileInput = e.target;
    const files = fileInput.files;
    const newImages = [...images];
    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);
    }
    setImages(newImages);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("photos", images[i]);
    }

    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("category", category.name);
    formData.append("description", description);
    formData.append("countInStock", countInStock);
    formData.append("categoryId", category.id);

    dispatch(createProduct(formData));
  };

  useEffect(() => {
    fetchCategories(setCategories);
  }, []);

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Add Product</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='price'>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Image</Form.Label>
            {/* <Form.Control
              type='text'
              placeholder='Enter image url'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control> */}
            <Form.Control
              type='file'
              id='image-file'
              label='Choose File'
              onChange={onFileChange}
              required
              multiple
            ></Form.Control>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock'>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter countInStock'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          {/* <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
        </Form.Group> */}
          <Form.Group controlId='category'>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as='select'
              value={category.id}
              onChange={(e) =>
                setCategory({
                  id: e.target.value,
                  name: e.target.options[e.target.selectedIndex].text,
                })
              }
              required
            >
              <option value=''>Select...</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button className='mt-3' type='submit' variant='primary'>
            Add
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductAddScreen;
