import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLinkData } from '../../store/shortlink/actions';
import './ShortLinkPage.scss';
import { clearResult } from '../../store/shortlink/shortlinkSlice';

const ShortLinkPage = () => {
    const { shortLink } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { fetching, commercial, progress, adImage, expired } = useSelector(state => state.shortLink);


    useEffect(() => {
        dispatch(fetchLinkData(shortLink, history));
        return dispatch(clearResult());
    }, [dispatch, history, shortLink]);

    if (fetching) return null;

    if (expired) {
        return (<h1>Данная ссылка устарела!</h1>)
    }

    if (!commercial) {
        return (<h1>Подождите, происходит переход по ссылке</h1>);
    }

    return (
        <>
            <LinearProgress variant="determinate" value={progress}/>
            <img className="ad-image" src={adImage} alt="Реклама"/>
            <h1>Подождите, происходит переход по ссылке</h1>
        </>
    );
};

export default ShortLinkPage;
