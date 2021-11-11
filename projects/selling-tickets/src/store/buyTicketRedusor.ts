import { RootAction } from './actions';

const defaultState = {
  id: '',
  name: '',
  tickets: [],
};

export const ticketBuyRedusor = (state = defaultState, action: RootAction) => {
  switch (action.type) {
    case 'BUY_TICKET_ACTION':
      return {
        ...state,
        formData: action.form,
      };
    default:
      return state;
  }
};
