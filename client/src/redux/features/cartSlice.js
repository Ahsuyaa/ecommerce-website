import { createSlice } from "@reduxjs/toolkit";
const CART_KEY="cart"
const getCartFromStorage=()=>
{
    const cart =localStorage.getItem(CART_KEY);
    if(cart)
    {
        return JSON.parse(cart);
    }
    return [];
}
const saveCartToStorage = (cart)=>
{
    localStorage.setItem(CART_KEY,JSON.stringify(cart));
};
const cartSlice = createSlice({
    name:"cart",
    initialState:getCartFromStorage(),
    reducers:
    {
        addItem(state,action)
        {
            const {product,quantity}=action.payload;
            const existingProduct =state.find((item)=>item._id===product._id);
            if(!existingProduct)
            {
                state.push({...product,quantity});
                saveCartToStorage(state);
            }
        },
        removeItem(state,action)
        {
            const filteredState=state.filter((item)=>item._id!==action.payload);
            saveCartToStorage(filteredState);
            return filteredState;
        },
        incrementItem(state,action)
        {
            const productIndex= state.findIndex(
             (item)=>item._id===action.payload
            );
        if(productIndex>=0)
        {
            state[productIndex].quantity++;
            saveCartToStorage(state);
        }
        },
        decrementItem(state,action)
        {
            const productIndex = state.findIndex(
                (item)=>item.id===action.payload
            );
            if(productIndex>=0 && state[productIndex].quantity>1)
            {
                state[productIndex].quantity--;
                saveCartToStorage(state);
            }
        }
    }
});
export const {addItem,removeItem,decrementItem,incrementItem}= cartSlice.actions;
export default cartSlice.reducer;
