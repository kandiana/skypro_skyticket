import { FC } from 'react';
import { EventImage } from '../EventImage/EventImage';
import { EventTitle } from '../EventTitle/EventTitle';
import { EventDate } from '../EventDate/EventDate';
import { format } from 'date-fns';
import './Card.scss'

export type props = {
    eventTitleText: string
}

export const Card: FC<props> = ({eventTitleText}) => {

    return (
        <div className='Card' >
            <EventImage />
            <EventTitle eventTitleText={eventTitleText} />
            <EventDate date={format(new Date(), 'dd.MM.yyyy')}/>
        </div>       
    );
};