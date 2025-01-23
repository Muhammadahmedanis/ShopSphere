import axios from "axios";
import { createProductFailiure, createProductSuccess } from "../redux/productSlice.js";
import { toast } from "react-toastify";
import { addToCart } from "../redux/cartSlice.js";

let token = JSON.parse(localStorage.getItem("token"));

export const createProduct = (product) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/v1/product`, product, {
      headers: {
          "Content-Type": "multipart/form-data", // Required for file upload
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


export const createAddToCart = (cart) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/v1/cart`, cart, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);

    if (response.data && response.data.data) {
      dispatch(addToCart(response.data.data)); // Dispatch success action with the ID
      toast.success(response.data.message);
      console.log(response.data);
    } else {
      throw new Error('Invalid response data');
    }
  } catch (error) {
    toast.error(error.response?.data.message || error.message);
    // dispatch(createProductFailure()); // Dispatch failure action
  }
};