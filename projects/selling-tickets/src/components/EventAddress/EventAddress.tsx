import { FC } from "react";
import './EventAddress.scss';

export type EventAddressProps = {
  address: string;
};

export const EventAddress: FC<EventAddressProps> = ({address}) => {
  return <h2 className='EventAddress'>{address}</h2>;
};