import { FC, useState } from 'react';

export const TicketCheck: FC = () => {
  const [ticketId, setTicketId] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicketId(event.target.value);
  };

  const checkTicket = () => {};

  return (
    <div>
      <input value={ticketId} onChange={handleInputChange} />
      <button onClick={checkTicket}>Проверить</button>
    </div>
  );
};
