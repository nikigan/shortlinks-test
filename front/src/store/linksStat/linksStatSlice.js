import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    links: []
}

const linksStatSlice = createSlice({
    name: "linksStat",
    initialState,
    reducers: {
        setLinksStat: (state, action) => {
            state.links = action.payload;
        }
    }
});

export const { setLinksStat } = linksStatSlice.actions;

export default linksStatSlice.reducer;
