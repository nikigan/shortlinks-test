import { fetchLinkStatistic } from '../../services/links';
import { setViews } from './linkViewsSlice';

export const getLinkViews = statisticLink => async dispatch => {
    const { data: { data :response } } = await fetchLinkStatistic({statisticLink});

    dispatch(setViews(response));
}
