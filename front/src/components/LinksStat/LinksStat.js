import React, { useEffect } from 'react';
import './LinksStat.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLinksStat } from '../../store/linksStat/actions';
import { Container, Paper } from '@material-ui/core';

const LinksStat = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLinksStat());
    }, [dispatch]);

    const links = useSelector(state => state.linksStat.links);

    const renderedLinks = links.map(({ id, full_link, unique_visitors, statistic_link }, index) => (
        <div className="py-3" key={id}>
            <div className="row">
                <div className="col-lg-1">
                    <h2>{index + 1}</h2>
                </div>
                <div className="col-lg-5">
                    <h3>Ссылка: <a className="text-break" href={full_link}>{full_link}</a></h3>
                    <Link to={`/stat/${statistic_link}`}>Подробная статистика</Link>
                </div>
                <div className="col-lg-6">
                    <h3>Количество уникальных посетителей: {unique_visitors}</h3>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="py-4">
            <Container>
                <Paper className="p-lg-3 p-2 content-box">
                    {renderedLinks.length === 0 && <h1>Ссылок не обнаружено</h1>}
                    {renderedLinks.length > 0 && renderedLinks}
                </Paper>
            </Container>
        </div>
    );
};

export default LinksStat;
