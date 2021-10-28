import { FC } from 'react';
import './EventDate.scss'

export type props = {
    date: () => void;
}

export const EventDate: FC<props> = ({date}) => {
    console.log(date())
    return (
        <p className='EventDate' >{date}</p>       
    );
};