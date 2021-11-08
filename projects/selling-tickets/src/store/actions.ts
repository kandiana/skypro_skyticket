import { EventDataShort } from '../components/CardsContainer/CardsContainer';
import { FormType } from '../pages/MainPage/MainPage';

export const FORM_FILTER_ACTION = 'FORM@FILTER' as const;
export const ARR_CARDS_ACTION = 'ARR@CARDS' as const;
export const TEST_BACK_ACTION = 'TEST_BACK' as const;
export const EVENT_PAGE_ACTION = 'EVENT_PAGE' as const;

export function getFormFilter(form: FormType) {
  return { type: FORM_FILTER_ACTION, form };
}

export function getArrCards(eventCards: EventDataShort[]) {
  return { type: ARR_CARDS_ACTION, eventCards };
}

export function getEventPage(eventCards: EventDataShort[]) {
  return { type: EVENT_PAGE_ACTION, eventCards };
}

export type FormFilterActionType = ReturnType<typeof getFormFilter>;
export type ArrCardsActionType = ReturnType<typeof getArrCards>;
export type EventPageActionType = ReturnType<typeof getEventPage>;

export type RootAction = FormFilterActionType | ArrCardsActionType | EventPageActionType;
