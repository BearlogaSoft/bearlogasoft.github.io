$(document).ready(function () {

    $("#feedback-icon").on("click", function (event) {
        $("#feedback-icon").addClass("hide");
        $("#game-patrick-icon").addClass("hide");
        $("#exit-icon").addClass("hide");
        $("#feedback").removeClass("hide");

    })

    $("#feedback").on("click", function (event) {
        $("#feedback-icon").removeClass("hide");
        $("#game-patrick-icon").removeClass("hide");
        $("#exit-icon").removeClass("hide");
        $("#feedback").addClass("hide");
    })

    $("#game-patrick-icon").on("click", function (event) {
        var w = document.getElementById('screen').offsetWidth;
        var h = document.getElementById('screen').offsetHeight;
        $("#game-patrick").css("width", w);
        $("#game-patrick").css("height", h);
        $("#game-patrick").removeClass("hide");
        let gameScript = document.createElement('script');
        gameScript.src = "./scripts/patrickGame.js";
        document.head.append(gameScript);
    })

})
