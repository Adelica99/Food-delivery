import { configureStore } from '@reduxjs/toolkit';

import shop from '../components/shop/ShopSlice';
import menu from '../components/sidebar/SidebarSlice';
import order from '../components/order/OrderSlice';


const store = configureStore({
    reducer: {shop, menu, order},
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'    
});

export default store;