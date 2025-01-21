import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    product: [],
    isFetching: false,
    error: false,
}
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // created
        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.product = action.payload
        },
        getProductFailiure: (state, action) => {
            state.isFetching = false;
            state.error = true;
        },

        // Delete
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.product.splice(
                state.product.findIndex(item => item._id === action.payload), 1
            )
        },
        deleteProductFailiure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // Edit
        editProductSuccess: (state, action) => {
        state.isFetching = false;
        state.product[
            state.product.findIndex(item => item._id === action.payload.id)
          ] = action.payload.product
        },
        editProductFailiure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
         // Create
        createProductSuccess: (state, action) => {
            state.isFetching = false;
            state.product.push(action.payload)
        },
        createProductFailiure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})

export const { getProductStart, getProductSuccess, getProductFailiure, deleteProductSuccess, deleteProductFailiure, editProductFailiure, editProductSuccess, createProductSuccess, createProductFailiure } = productSlice.actions;
export default productSlice.reducer;