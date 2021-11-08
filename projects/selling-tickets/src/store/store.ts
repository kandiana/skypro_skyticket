import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers';

export const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof reducer>;

store.subscribe(() => console.log(store.getState()));


