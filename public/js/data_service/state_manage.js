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
const loadingStatusReducer = (state, action) => {
    if (!state) {
        return {loading_status: false};
    }
    const {type, payload} = action;
    switch (type) {
        case 'LOADING_STATUS':
            return Object.assign({}, state, {loading_status: payload});
        default:
            return state;
    }
};

export const loadingStatusStore = createStore(loadingStatusReducer);

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
 * @function dataYearReducer
 * @param  {type} state  {description}
 * @param  {type} action {description}
 * @return {type} {description}
 */
const dataYearReducer = (state, action) => {
    if (!state) {
        return {data_year: 2000};
    }
    const {type, payload} = action;
    switch (type) {
        case 'UPDATE_DATA_YEAR':
            return Object.assign({}, state, {data_year: payload});
        default:
            return state;
    }
};

export const dataYearStore = createStore(dataYearReducer);

/**
 * @function dataTypeReducer
 * @param  {type} state  {description}
 * @param  {type} action {description}
 * @return {type} {description}
 */
const dataTypeReducer = (state, action) => {
    if (!state) {
        return {data_type: 'Total Petroleum Consumption'};
    }
    const {type, payload} = action;
    switch (type) {
        case 'UPDATE_DATA_TYPE':
            return Object.assign({}, state, {data_type: payload});
        default:
            return state;
    }
};

export const dataTypeStore = createStore(dataTypeReducer);