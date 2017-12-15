import {init_state} from './data_prepare.js';
import {fetchDataByYear, fetchDataByName} from './data_fetch.js';

/**
 * @function createStore
 * @param  {type} reducer {description}
 * @return {type} {description}
 */
const createStore = (reducer) => {
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
    return {getState, dispatch, subscribe};
};

/**
 * @function loadingStatusReducer
 * @param  {type} state  {description}
 * @param  {type} action {description}
 * @return {type} {description}
 */
const infoReducer = (state, action) => {
    if (!state) {
        return init_state;
    }
    const {type, payload} = action;
    switch (type) {
        case 'LOADING_STATUS':
            return Object.assign({}, state, {loading_status: payload});
        case 'UPDATE_DATA_YEAR':
            return Object.assign({}, state, {data_year: payload});
        case 'UPDATE_DATA_TYPE':
            return Object.assign({}, state, {data_type: payload});
        case 'UPDATE_DATA_NAME':
            return Object.assign({}, state, {data_name: payload});
        default:
            return state;
    }
};

export const infoStore = createStore(infoReducer);

/**
 * @function countriesArrReducer
 * @param  {type} state  {description}
 * @param  {type} action {description}
 * @return {type} {description}
 */
const countriesArrReducer = (state, action) => {
    if (!state) {
        return {countries_arr: []};
    }
    const {type, payload} = action;
    switch (type) {
        case 'UPDATE_COUNTRIES':
            return Object.assign({}, state, {countries_arr: payload});
        default:
            return state;
    }
};

export const countriesArrStore = createStore(countriesArrReducer);

/**
 * @function yearsArrReducer
 * @param  {type} state  {description}
 * @param  {type} action {description}
 * @return {type} {description}
 */
const yearsArrReducer = (state, action) => {
    if (!state) {
        return {years_arr: []};
    }
    const {type, payload} = action;
    switch (type) {
        case 'UPDATE_YEARS':
            return Object.assign({}, state, {years_arr: payload});
        default:
            return state;
    }
};

export const yearsArrStore = createStore(yearsArrReducer);

/**
 * @function dispatchAction
 * @param  {type} data_param {description}
 * @param  {type} data_type  {description}
 * @param  {type} action     {description}
 * @param  {type} callback   {description}
 * @return {type} {description}
 */
export const dispatchAction = (data_param, data_type, action, callback) => {
    infoStore.dispatch({type: 'UPDATE_DATA_TYPE', payload: data_type});
    switch (action) {
        case 'byYear':
            infoStore.dispatch({type: 'UPDATE_DATA_YEAR', payload: data_param});
            fetchDataByYear(data_param, data_type, function (data) {
                if (callback && typeof callback === "function") {
                    callback(data);
                }
            });
            break;
        case 'byName':
            infoStore.dispatch({type: 'UPDATE_DATA_NAME', payload: data_param});
            fetchDataByName(data_param, data_type, function (data) {
                if (callback && typeof callback === "function") {
                    callback(data);
                }
            });
            break;
    }
    
};