// World Line Graph
$("#world_trend")
    .on("click", function() {
        var worldGraph = function() {
            $
                .ajax({ url: `/countries?selection=${data_selection}`, method: "GET", dataType: "json" })
                .done(function(data) {
                    renderWorld(data);
                    loadingStatus(false);
                });
        };
        worldGraph();
    });