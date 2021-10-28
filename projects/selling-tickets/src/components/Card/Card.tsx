import { FC } from 'react';
import { EventImage } from '../EventImage/EventImage';
import { EventTitle } from '../EventTitle/EventTitle';
import { EventDate } from '../EventDate/EventDate';

import './Card.scss'

export type props = {
    eventTitleText: string
    imagePath: string
    date: Date
}

export const Card: FC<props> = ({eventTitleText, imagePath, date}) => {
    
    return (
        <div className='Card' >
            <EventImage imagePath={imagePath}/>
            <EventTitle eventTitleText={eventTitleText} />
            <EventDate date={date}/>
        </div>       
    );
};