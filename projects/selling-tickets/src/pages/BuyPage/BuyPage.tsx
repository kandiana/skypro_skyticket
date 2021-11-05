import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { EventDate } from '../../components/EventDate/EventDate';
import { EventImage } from '../../components/EventImage/EventImage';
import { EventTitle } from '../../components/EventTitle/EventTitle';

import './BuyPage.scss';

export type Props = {
    eventTitleText: string;
    imagePath: string;
    date: Date;
    text: string;
};

type urlParams = {
    id: string;
};

export const BuyPage: FC<Props> = ({ eventTitleText, imagePath, date, text }) => {
    let { id } = useParams<urlParams>();
    console.log(id);
    
    return (
        <div className="Buy-page">
        <EventImage imagePath={imagePath} />
        <EventTitle eventTitleText={eventTitleText} />
        <p>{text}</p>
        <EventDate date={date} />
        </div>
    );
};