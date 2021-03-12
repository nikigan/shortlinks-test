import { fetchAllLinksStats } from '../../services/links';
import { setLinksStat } from './linksStatSlice';

export const getLinksStat = () => async dispatch => {
    const { data: { data: response } } = await fetchAllLinksStats();

    dispatch(setLinksStat(response));
}
