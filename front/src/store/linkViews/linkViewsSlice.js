import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    link: {},
    views: []
}

const linkViewsSlice = createSlice({
    name: "linkViews",
    initialState,
    reducers: {
        setViews: (state, { payload: { link_visits, full_link, redirect_link, created_at, end_time }}) => {
            state.views = link_visits;
            state.link = {
                full_link,
                redirect_link,
                created_at,
                end_time
            }
        },
        clearResult: () => initialState
    }
});
export const { setViews, clearResult } = linkViewsSlice.actions;

export default linkViewsSlice.reducer;
