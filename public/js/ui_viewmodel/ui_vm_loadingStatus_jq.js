// Showing Loading Status
export default function loadingStatus(changeState) {
    if (changeState) {
        loadingState = changeState;
        $("input").attr("disabled", changeState);
        $("button").attr("disabled", changeState);
        $("body").append("<div class=\"loadingStatus\"><img id=\"loading_img\" src=\"/images/loading.gif\"" +
            " height=\"64px\" width=\"64px\"></div>");
    } else {
        $("#loading").remove();
        loadingState = changeState;
        $("input").attr("disabled", changeState);
        $("button").attr("disabled", changeState);
    }
}