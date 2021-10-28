import { FC } from 'react';
import './EventDate.scss'
import { format } from 'date-fns';

export type props = {
    date: Date
}

export const EventDate: FC<props> = ({date}) => {
    return (
        <p className='EventDate' >{format(date, 'dd.MM.yyyy')}</p>       
    );
};