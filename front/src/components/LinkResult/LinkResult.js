import React from 'react';
import './LinkResult.scss';
import { useSelector } from 'react-redux';

const LinkResult = () => {

    const { short_link, statistic_link } = useSelector(state => state.shortLink.result);

    return (
        <div>
            <h3>Короткая ссылка:</h3>
            <a className="text-break" href={short_link}>{short_link}</a>
            <h3>Ссылка для просмотра статистики:</h3>
            <a className="text-break" href={statistic_link}>{statistic_link}</a>
        </div>
    );
};

export default LinkResult;
