import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//загрузка товаров
export const fetchProducts = createAsyncThunk(
    "purchase/fetchProducts",
    async() => {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        return await res.json();
    }
);

const purchaseSlice = createSlice({
    name: "purchase",
    initialState: {
        products: [], // было product: [], исправлено на products: []
        cart: [],
        userData: null
    },
    reducers: {
        addToCart(state, action) {
            state.cart.push(action.payload);
        },
        setUserData(state, action) {
            state.userData = action.payload;
        },
        clearCart(state) {
            state.cart = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => { // убрана лишняя скобка и запятая
            state.products = action.payload.slice(0, 5);
        });
    }
});

export const { addToCart, setUserData, clearCart } = purchaseSlice.actions;
export default purchaseSlice.reducer;




