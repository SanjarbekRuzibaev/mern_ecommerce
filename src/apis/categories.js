import axios from "axios";
import toast from "react-hot-toast";
const backend_url = process.env.REACT_APP_API_BASE_URL;
export const createCategory = async (category, navigate) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`${backend_url}/api/categories`, category, config);
    navigate("/admin/categorylist");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const fetchCategories = async (setCategories) => {
  try {
    const { data } = await axios.get(`${backend_url}/api/categories`);
    setCategories(data.categories);
  } catch (error) {}
};

export const deleteCategory = async (id) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`${backend_url}/api/categories` + "/" + id, config);
    fetchCategories();
  } catch (error) {}
};
