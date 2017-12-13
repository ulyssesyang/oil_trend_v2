import { store } from '../data_service/state_manage.js';

// Showing Loading Status
export default function loadingStatus() {
    let currentState = store
        .getState()
        .loading_status;
    console.log('loading status:', currentState);
    if (currentState) {
        $("input").attr("disabled", currentState);
        $("button").attr("disabled", currentState);
        $("body").append("<div class=\"loadingStatus\"><img id=\"loading_img\" src=\"/images/loading.gif\"" +
            " height=\"64px\" width=\"64px\"></div>");
        console.log('loading status on');
    } else {
        $(".loadingStatus").remove();
        $("input").attr("disabled", currentState);
        $("button").attr("disabled", currentState);
        console.log('loading status off');
    }
}