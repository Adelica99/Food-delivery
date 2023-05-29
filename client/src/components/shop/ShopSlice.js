import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    shop: [],
    shopLoadingStatus: 'idle'
};

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchShop.pending, state => {state.shopLoadingStatus = 'loading'})
            .addCase(fetchShop.fulfilled, (state, action) => {
                state.shopLoadingStatus = 'idle';
                state.shop = action.payload
            })
            .addCase(fetchShop.rejected, state => {state.shopLoadingStatus = 'error'})
    }
});

export const fetchShop = createAsyncThunk(
    'shop/fetchShop',
    (shop) => {
        const request = useHttp();
        return request(`http://localhost:3001/getShop?shop=${shop}`);
    }
);

const {action, reducer} = shopSlice;
export default reducer;
 