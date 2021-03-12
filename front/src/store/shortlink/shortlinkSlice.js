import { createSlice } from '@reduxjs/toolkit';
import { TIMER_RATE, TIMER_TIME } from '../../constants';

const initialState = {
    commercial: false,
    fetching: true,
    redirectUrl: null,
    adImage: null,
    progress: 0,
    result: false,
    expired: false
};

const shortLinkSlice = createSlice({
    name: 'shortLink',
    initialState,
    reducers: {
        setShortLink: (state, { payload: { commercial, redirectUrl, ad_url } }) => {
            state.fetching = false;
            state.commercial = commercial;
            state.redirectUrl = redirectUrl;
            state.adImage = ad_url || '';
        },
        tick: state => {
            state.progress += 100 / (TIMER_TIME / TIMER_RATE);
        },
        expiredLink: state => {
            state.fetching = false;
            state.expired = true;
        },
        clearResult: () => initialState,
        setResult: (state, { payload: { full_short_link, statistic_link } }) => {
            state.result = {
                short_link: full_short_link,
                statistic_link
            };
        }
    }
});

export const { setShortLink, tick, setResult, clearResult, expiredLink } = shortLinkSlice.actions;

export default shortLinkSlice.reducer;
