import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async function to fetch cart from database
export const fetchCart = createAsyncThunk("cart/fetchCart", async (username) => {
    const response = await fetch(`http://localhost:3000/CartPage/${username}`);
    const data = await response.json();
    return data;
});
export const fetchorder = createAsyncThunk("cart/fetchCart", async (username) => {
    const response = await fetch(`http://localhost:3000/Order/${username}`);
    const data = await response.json();
    return data;
});

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [], loading: false },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        addOrders: (state, action) => {
            state.items.push(action.payload);
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.productId !== action.payload);
        },
        emptyCart: (state, action) => {
            state.items = []
        },


    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        });
    }
});

export const { addToCart, removeFromCart, emptyCart, addOrders } = cartSlice.actions;
export default cartSlice.reducer;