import { FC, useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EventImage } from '../../components/EventImage/EventImage';
import { EventTitle } from '../../components/EventTitle/EventTitle';
import { EventDate } from '../../components/EventDate/EventDate';
import { RootState } from '../../store/store';
import { fetchBuyPage, fetchEventPage } from '../../store/thunks';
import { EventCity } from '../../components/EventCity/EventCity';
import { EventAddress } from '../../components/EventAddress/EventAddress';
import { EventLoader } from '../../components/EventLoader/EventLoader';
import { EventDescription } from '../../components/EventDescription/EventDescription';

import './EventPage.scss';
import { Input } from '../../components/Input/Input';

type urlParams = {
  id: string;
};

export type FormBuyType = {
  nameBayer: string;
  countTicket: string;
};

export const EventPage: FC = () => {
  let { id } = useParams<urlParams>();

  const EMPTY_FORM: FormBuyType = {
    nameBayer: '',
    countTicket: '1',
  };

  const [form, setForm] = useState(EMPTY_FORM);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventPage(id));
  }, [dispatch, id]);

  const cardData = useSelector((state: RootState) => state.reducer.cardData);

  const handleChange = useCallback((e) => {
    setForm((prev: FormBuyType) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const history = useHistory();

  const saveFormBuyTicket = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(fetchBuyPage(id, form.countTicket, form.nameBayer));
    history.push(`/buy/${id}`);
  };

  return (
    <div className="EventPage">
      {cardData === undefined ? (
        <EventLoader />
      ) : (
        <div className="EventPage">
          <div className="EventPage__image">
            <EventImage imagePath={cardData.img.url} />
          </div>
          <div className="EventPage__info">
            <EventTitle title={cardData.title} />
            <form className="buy_page" action="submit" onSubmit={saveFormBuyTicket}>
              <div
                style={{
                  width: '500px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: '1px solid black',
                }}
              >
                <Input
                  name="nameBayer"
                  placeholder={'Введите свое имя'}
                  onChange={handleChange}
                  value={form.nameBayer}
                  onFocus={() => {}}
                />
                <Input
                  name="countTicket"
                  placeholder={''}
                  onChange={handleChange}
                  value={form.countTicket}
                  onFocus={() => {}}
                />
                <button type="submit">Купить</button>
              </div>
            </form>
            <EventDescription description={cardData.description} />
            <EventCity city={cardData.city} />
            <EventAddress address={cardData.address} />
            <EventDate date={cardData.startTimestamp} />
          </div>
        </div>
      )}
    </div>
  );
};
