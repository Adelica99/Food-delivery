import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuItem: 'Mc Donny'
};

const sidebarSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        changeMenu: (state, action) => {state.menuItem = action.payload}
    }
});

const {actions, reducer} = sidebarSlice;
export const { changeMenu } = actions;
export default reducer;