import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    order: [],
    orderLoadingStatus: 'idle',
    successfulOrder: false,
    totalPrice: 0,
    animation: {'animation': ''}
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const newProduct = action.payload;
            const isProductInOrder = state.order.find(item => item._id === newProduct._id);
            if (isProductInOrder) {
                state.order = state.order.map(item => item._id === newProduct._id ? { ...item, counter: item.counter + 1 } : item);
                localStorage.setItem('userProductCart', JSON.stringify(state.order));
            } else {
                state.order = [...state.order, {...newProduct, counter: 1}];
                localStorage.setItem('userProductCart', JSON.stringify(state.order));
            }
        },
        changeTotalPrice: (state, action) => {
            state.totalPrice = +(state.totalPrice + action.payload).toFixed(2);
            localStorage.setItem('totalPrice', JSON.stringify(state.totalPrice));
        },
        increaseCounter: (state, action) => {
            const idProduct = action.payload;
            state.order = state.order.map(item => item._id === idProduct ? { ...item, counter: item.counter + 1 } : item); 
            localStorage.setItem('userProductCart', JSON.stringify(state.order));
        },
        decreaseCounter: (state, action) => {
            const productId = action.payload._id;
            const productCounter = action.payload.counter;
            if (productCounter > 1) {
                state.order = state.order.map(item => item._id === productId ? { ...item, counter: item.counter - 1 } : item);
                localStorage.setItem('userProductCart', JSON.stringify(state.order));
            } else {
                state.order = state.order.filter(item => item._id !== productId);
                localStorage.setItem('userProductCart', JSON.stringify(state.order));
            } 
        },
        setAnimation: (state, action) => {state.animation = action.payload},
        changeOrder: (state, actions) => {state.order = actions.payload},
        changeSuccessfulOrder: (state, actions) => {state.successfulOrder = actions.payload}
    },
    extraReducers: builder => {
        builder
            .addCase(fetchOrder.pending, state => {state.orderLoadingStatus = 'loading'})
            .addCase(fetchOrder.fulfilled, (state) => {
                state.orderLoadingStatus = 'idle';
                state.totalPrice = 0;
                state.order = [];
                state.successfulOrder = true;
            })
            .addCase(fetchOrder.rejected, state => {state.orderLoadingStatus = 'error'})
    }
});

export const fetchOrder = createAsyncThunk(
    'order/fetchOrder',
    (order) => {
        const request = useHttp();
        return request(`http://localhost:3001/sendOrder`, 'POST', order);
    }
)

const {actions, reducer} = orderSlice;
export const { addProduct, 
               changeTotalPrice, 
               increaseCounter, 
               decreaseCounter, 
               setAnimation,
               changeSuccessfulOrder,
               changeOrder} = actions;
export default reducer;