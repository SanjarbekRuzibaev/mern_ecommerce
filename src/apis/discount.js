import axios from "axios";
import { toast } from "react-hot-toast";
const backend_url = process.env.REACT_APP_API_BASE_URL;
export const fetchDiscount = async (setDiscount) => {
  try {
    const { data } = await axios.get(`${backend_url}/api/orders/discount/current`);
    setDiscount(data);
  } catch (error) {}
};

export const addDiscount = async (discount, navigate) => {
  try {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `${backend_url}/api/orders/discount/edit`,
      discount,
      config,
    );
    navigate("/admin/orderlist");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
