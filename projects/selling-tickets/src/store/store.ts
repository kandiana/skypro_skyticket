import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers';
import { ticketBuyRedusor } from './buyTicketRedusor';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReduser = combineReducers({ reducer, ticketBuyRedusor });

export const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReduser>;

export type RootStateTicket = ReturnType<typeof rootReduser>;

store.subscribe(() => console.log(store.getState()));
