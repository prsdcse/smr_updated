import { createStore, applyMiddleware, compose } from 'redux';
//import { createLogger } from "redux-logger";
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import sagas from '../sagas';
import {
    createReduxBoundAddListener,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

/*const logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
    diff: true
});*/

const reduxMiddleware = createReactNavigationReduxMiddleware(
    'root',
    (state) => state.nav
);

export const addListener = createReduxBoundAddListener('root');

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {

    const middlewares = isDebuggingInChrome ? [
        sagaMiddleware,
        reduxMiddleware
    ] : [
        sagaMiddleware,
        reduxMiddleware
    ];

    const enhancer = compose(
        applyMiddleware(
            ...middlewares
        )
    )

    let store = createStore(
        reducers,
        enhancer
    );
    

    if (isDebuggingInChrome) {
        window.store = store;
    }

    sagaMiddleware.run(sagas);

    return store;    
}