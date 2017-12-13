export default function ui_draggable(target) {
    $(target).draggable();
    // remove target whenever mouse click outside
    $(document).on('click', function(e) {
        // if the target of the click isn't the draggable div
        if (!$(target).is(e.target)) {
            $(target).remove();
        }
    });
}