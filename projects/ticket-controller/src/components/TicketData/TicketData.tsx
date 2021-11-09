import { FC, ChangeEventHandler } from 'react';

export type TicketDataProps = {
  id: string;
  onChange: ChangeEventHandler;
};

export const TicketData: FC<TicketDataProps> = ({ id, onChange }) => {
  return <input value={id} onChange={onChange} />;
};
