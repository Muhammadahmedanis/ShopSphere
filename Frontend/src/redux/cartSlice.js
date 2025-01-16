const storeInLocalStorage = (data) => {
    localStorage.setItem('cart', JSON.stringify(data))
}

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    data: [],
    totalAmount: 0,
    totalItems: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exisingProduct = state.data.find(product => product.id === action.payload.id);
            if(exisingProduct){
                const tempCart = state.data.map((product) => {
                    if(product.id === action.payload.id){
                        let newQty = product.quantity + action.payload.quantity;
                        let newTotalPrice = newQty * product.price;
                        return {
                            ...product, 
                            quantity: newQty, 
                            totalPrice: newTotalPrice,
                        };
                    }else {
                        return product;
                    }
                });
                state.data = tempCart;
                storeInLocalStorage(state.data)
            }else {
                state.data.push(action.payload);
                storeInLocalStorage(state.data);
            }
        },

        updateQty: (state, action) => {
            const {id, quantity} = action.payload;
            const productUpdate = state.data.find((product) => product.id === id );
            if(productUpdate){
                const validQty = Math.max(quantity || 1, 1);
                productUpdate.quantity = validQty;
                productUpdate.totalPrice = productUpdate.price * validQty;
            }
        },

        removeItem: (state, action) => {
            const tempCart = state.data.filter((product) => product.id !== action.payload.id);
            state.data = tempCart;
            storeInLocalStorage(state.data);
        },

        getCartTotal: (state) => {
            state.totalAmount = state.data.reduce((cartTotal, cartItem) => {
                return (cartTotal += cartItem.totalPrice)
            }, 0)
            state.totalItems = state.data.length;
            storeInLocalStorage(state.data);
        },
    }
});

export const { addToCart, updateQty, removeItem, getCartTotal} = cartSlice.actions;
export default cartSlice.reducer;