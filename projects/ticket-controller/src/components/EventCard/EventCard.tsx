import { FC } from 'react';
import { useHistory } from 'react-router-dom';

export type EvetnCardProps = {
  id: string;
  text: string;
};

export const EventCard: FC<EvetnCardProps> = ({ id, text }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/event/${id}`);
  };

  return <div onClick={handleClick}>{text}</div>;
};
