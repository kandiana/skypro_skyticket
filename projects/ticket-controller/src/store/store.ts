import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { eventsReducer } from './reducer';

export const store = createStore(eventsReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof eventsReducer>;
