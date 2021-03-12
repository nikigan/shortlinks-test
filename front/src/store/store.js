import shortLinkSlice from './shortlink/shortlinkSlice';
import linkViewsSlice from './linkViews/linkViewsSlice';
import { configureStore } from '@reduxjs/toolkit';
import linksStatSlice from './linksStat/linksStatSlice';

const store = configureStore({
    reducer: {
        shortLink: shortLinkSlice,
        linkViews: linkViewsSlice,
        linksStat: linksStatSlice
    }
});

export default store;
