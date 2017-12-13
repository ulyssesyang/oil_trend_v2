import { initial_state } from './data_prepare.js';

/**
 * @function reducer
 * @param  {type} state  {description}
 * @param  {type} action {description}
 * @return {type} {description}
 */
const reducer = (state, action) => {
    if (!state) {
        return initial_state;
    }
    const { type, payload } = action;
    switch (type) {
        case 'UPDATE_COUNTRIES':
            return Object.assign({}, state, { countries_arr: payload });
        case 'UPDATE_YEAR':
            return Object.assign({}, state, { data_year: payload });
        case 'UPDATE_DATA_TYPE':
            return Object.assign({}, state, { data_type: payload });
        case 'UPDATE_LOADING_STATUS':
            return Object.assign({}, state, { loading_status: payload });
        default:
            return state;
    }
};

/**
 * @function createStore
 * @param  {type} reducer {description}
 * @return {type} {description}
 */
export const createStore = (reducer) => {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        console.log('dispatching', action);
        state = reducer(state, action);
        listeners.forEach((listener) => {
            listener();
        });
    };
    dispatch({});
    return { getState, dispatch, subscribe };
};

export const store = createStore(reducer);