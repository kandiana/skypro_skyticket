import { FormType } from '../pages/MainPage/MainPage';

export const FORM_FILTER_ACTION = 'FORM@FILTER' as const;
export const ARR_CARDS_ACTION = 'ARR@CARDS' as const;

export function getFormFilter(form: FormType) {
  return { type: FORM_FILTER_ACTION, form };
}

export function getArrCards() {
  return { type: ARR_CARDS_ACTION };
}

export type FormFilterActionType = ReturnType<typeof getFormFilter>;
export type ArrCardsActionType = ReturnType<typeof getArrCards>;

export type RootAction = FormFilterActionType | ArrCardsActionType;
