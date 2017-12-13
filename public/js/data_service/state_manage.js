/**
 * @function reducer
 * @param  {type} state  {description}
 * @param  {type} action {description}
 * @return {type} {description}
 */
function reducer(state, action) {
    if (!state) {
        return { year: 2000, data_type: "Total Petroleum Consumption", loading_status: false };
    }
    switch (action.type) {
        case 'UPDATE_YEAR':
            return { year: action.year, data_type: state.data_type, loading_status: state.loading_status };
        case 'UPDATE_DATA_TYPE':
            return { year: state.year, data_type: action.data_type, loading_status: state.loading_status };
        case 'UPDATE_DATA_TYPE':
            return { year: state.year, data_type: state.data_type, loading_status: action.loading_status };
        default:
            return state;
    }
}

/**
 * @function createStore
 * @param  {type} reducer {description}
 * @return {type} {description}
 */
export function createStore(reducer) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => {
            listener();
        });
    };
    dispatch({});
    return { getState, dispatch, subscribe };
}