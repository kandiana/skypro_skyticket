export const FORM_FILTER_ACTION = 'FORM@FILTER' as const;
export const ARR_CARDS_ACTION = 'ARR@CARDS' as const;
export const ARR_CARDS_SUCCESS_ACTION = 'ARR@CARDS_SUCCESS' as const;

export function getFormFilter() {
  return { type: FORM_FILTER_ACTION };
}

export function getArrCards() {
  return { type: ARR_CARDS_ACTION };
}

export function getArrCardsSuccess() {
  return { type: ARR_CARDS_SUCCESS_ACTION };
}

export type FormFilterActionType = ReturnType<typeof getFormFilter>;
export type ArrCardsActionType = ReturnType<typeof getArrCards>;
export type ArrCardsSuccessActionType = ReturnType<typeof getArrCardsSuccess>;

export type RootAction = FormFilterActionType | ArrCardsActionType | ArrCardsSuccessActionType;
