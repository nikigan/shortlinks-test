import React, { useEffect } from 'react';
import './LinkViews.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkViews } from '../../store/linkViews/actions';
import moment from 'moment';
import { Container } from '@material-ui/core';
import { clearResult } from '../../store/linkViews/linkViewsSlice';

moment.locale('ru');

const LinkViews = () => {

    const dispatch = useDispatch();
    const { statisticLink } = useParams();

    const views = useSelector(state => state.linkViews.views);

    const { full_link, created_at, end_time, redirect_link } = useSelector(state => state.linkViews.link);

    useEffect(() => {
        dispatch(getLinkViews(statisticLink));
        return () => {
            dispatch(clearResult());
        }
    }, [dispatch, statisticLink]);


    const renderedViews = views.map((v, index) => {
        return (
            <div className="view-card shadow-sm" key={v.id}>
                <div className="row">
                    <div className="col-lg-1 d-flex align-items-center justify-content-center">
                        <h2>{ index + 1}</h2>
                    </div>
                    <div className="col-lg-5 view-card__text-block">
                        <h3 className="view-card__ip">IP-адрес клиента: {v.client_ip}</h3>
                        <h5 className="view-card__time">Время: {moment(v.created_at).format('llll')}</h5>
                    </div>
                    <div className="col-lg-6">
                        <img src={v.ad_image} alt={v.ad_image} className="view-card__image"/>
                    </div>
                </div>

            </div>
        );
    });

    return (
        <Container className="py-5">
            <div className="pb-4">
                <h1>Ссылка: <a className="text-break" href={full_link}>{full_link}</a></h1>
                <h2>Перенаправляет на: <a className="text-break" href={redirect_link}>{redirect_link}</a></h2>
                <h4>Действительна до: {moment(end_time).format('llll')}</h4>
                <h4>Создана: {moment(created_at).format('llll')}</h4>
            </div>
            <h3 className="text-left">История переходов: </h3>
            {renderedViews}
        </Container>
    );
};

export default LinkViews;
