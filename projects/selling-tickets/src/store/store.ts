import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './reducers';
import testSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(testSaga);

export type RootState = ReturnType<typeof reducer>;

store.subscribe(() => console.log(store.getState()));


