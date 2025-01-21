import axios from "axios";
import { getProductStart, getProductSuccess, getProductFailiure } from "../redux/productSlice.js";

export const fetchProducts = () => async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("/api/v1/product");
    
    dispatch(getProductSuccess(res.data.data)); // Dispatch success action with data
  } catch (error) {
    dispatch(getProductFailiure()); // Dispatch failure action
    console.error(error);
  }
};
