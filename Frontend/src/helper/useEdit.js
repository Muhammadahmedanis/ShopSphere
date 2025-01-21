import axios from "axios";
import { editProductFailiure, editProductSuccess } from "../redux/productSlice.js";
import { toast } from "react-toastify";

let token = JSON.parse(localStorage.getItem("token"));

export const updateProduct = (product, id) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/v1/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(editProductSuccess({id, product})); // Dispatch success action with the ID
    toast.success(response.data.message);
    console.log(response.data);
  } catch (error) {
    dispatch(editProductFailiure()); // Dispatch failure action
    toast.error(error.response?.data.message);
  }
};

// setUsers(product.filter(item => item._id !== id));