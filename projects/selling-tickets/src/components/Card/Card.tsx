import { FC } from 'react';
import { EventImage } from '../EventImage/EventImage';
import { EventTitle } from '../EventTitle/EventTitle';
import { EventDate } from '../EventDate/EventDate';

import './Card.scss'

export type props = {
    eventTitleText: string
    pathImage: string
    date: () => void
}

export const Card: FC<props> = ({eventTitleText, pathImage, date}) => {
    
    return (
        <div className='Card' >
            <EventImage pathImage={pathImage}/>
            <EventTitle eventTitleText={eventTitleText} />
            <EventDate date={date}/>
        </div>       
    );
};