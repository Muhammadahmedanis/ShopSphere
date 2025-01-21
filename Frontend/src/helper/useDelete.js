import axios from "axios";
import { deleteProductFailiure, deleteProductSuccess } from "../redux/productSlice.js";
import { toast } from "react-toastify";

let token = JSON.parse(localStorage.getItem("token"));

export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/v1/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteProductSuccess(id)); // Dispatch success action with the ID
    toast.success(response.data.message);
    console.log(response.data);
  } catch (error) {
    dispatch(deleteProductFailiure()); // Dispatch failure action
    toast.error(error.response?.data.message);
  }
};

// setUsers(product.filter(item => item._id !== id));