import axios from "axios";
import { createProductFailiure, createProductSuccess } from "../redux/productSlice.js";
import { toast } from "react-toastify";

let token = JSON.parse(localStorage.getItem("token"));

export const createProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/v1/product`, {product}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(createProductSuccess(response.data.data)); // Dispatch success action with the ID
    toast.success(response.data.message);
    console.log(response.data);
  } catch (error) {
    dispatch(createProductFailiure()); // Dispatch failure action
    toast.error(error.response?.data.message);
  }
};

// setUsers(product.filter(item => item._id !== id));