import { FC } from 'react';
import './EventImage.scss';
import image from '../../assets/images/theBeatlesTribute.jpg'

export const EventImage: FC = () => {
    return (
        <img className='EventImage' src={image} alt='мероприятие'/>

    );
};