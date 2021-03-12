import { createShortLink, resolveShortLink } from '../../services/links';
import { expiredLink, setResult, setShortLink, tick } from './shortlinkSlice';
import { redirect } from '../../utils';
import { TIMER_RATE, TIMER_TIME } from '../../constants';

export const createLink = data => async dispatch => {
  const { data: { data: response } } = await createShortLink(data);

  console.log(response);
  dispatch(setResult(response));
};

export const fetchLinkData = (shortLink, history) => async (dispatch, getState) => {
    try {
        const { data: { data: { commercial, redirect_link: redirectUrl, ad_url } } } = await resolveShortLink({ shortLink });

        let timer = null;
        clearInterval(timer);

        dispatch(setShortLink({ commercial, redirectUrl, ad_url }));

        if (!commercial) {

            redirect(redirectUrl);

        } else {
            timer = setInterval(() => {
                dispatch(tick());
                const { shortLink: { progress } } = getState();

                if (progress >= TIMER_TIME / TIMER_RATE) {
                    clearInterval(timer);
                    redirect(redirectUrl);
                }
            }, TIMER_RATE);

        }
    } catch (e) {
        if (e.response.status === 410) {
            dispatch(expiredLink());
        } else {
            history.push('/');
        }
    }
};
