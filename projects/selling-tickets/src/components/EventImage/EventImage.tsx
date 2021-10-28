import { FC } from 'react';
import './EventImage.scss';


export type props = {
    pathImage: string
}

export const EventImage: FC<props> = ({pathImage}) => {
    return (
        <img className='EventImage' src={pathImage} alt='мероприятие'/>

    );
};