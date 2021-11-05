import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { arrCards } from '../components/CardsContainer/CardsContainer';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(testSaga);

export type RootState = ReturnType<typeof reducer>;

store.subscribe(() => console.log(store.getState()));


