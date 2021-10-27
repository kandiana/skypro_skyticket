import { FC } from 'react';
import { EventImage } from '../EventImage/EventImage';
import { EventTitle } from '../EventTitle/EventTitle';
import './Card.scss'

export const Card: FC = () => {

 
    return (
        <div className='Card' >
            <EventImage />
            <EventTitle eventTitleText='Мероприятие' />
        </div>       
    );
};