import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { arrCards } from '../components/CardsContainer/CardsContainer';
import { reducer } from './reducers';
import axios from 'axios';
import { arrCards } from '../components/CardsContainer/CardsContainer';

export const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof reducer>;

store.subscribe(() => console.log(store.getState()));


