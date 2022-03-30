var w = document.getElementById('slider').offsetWidth;
var h = document.getElementById('slider').offsetHeight;
var viewFlag = sessionStorage.getItem(video);
document.addEventListener("DOMContentLoaded", () => {
        if (viewFlag == "true") {
            $("#sliderBG").addClass("hide");
            $("#sliderFG").addClass("hide");
            $("#video").css("width", w);
            $("#video").css("height", h);
            $("#video").removeClass("hide");
        }
  });

$(document).ready(function () {

    var flag = true;

    $("#control-panel").on("click", function (event) {


        if (flag) {
            $("#sliderBG").addClass("hide");
            $("#sliderFG").addClass("hide");
            $("#video").css("width", w);
            $("#video").css("height", h);
            $("#video").removeClass("hide");
            
            flag = false;
            viewFlag = true;
        }
        else {
            $("#sliderBG").removeClass("hide");
            $("#sliderFG").removeClass("hide");
            $("#video").addClass("hide");
            
            flag = true;
            viewFlag = false;
        }
    })

})

window.onresize = (e) => {
    w = document.getElementById('slider').offsetWidth;
    h = document.getElementById('slider').offsetHeight;

    gsap.set(sliderBG, {
        width: w,
        height: h
      })
      gsap.set(sliderFG, {
        width: w,
        height: h
      })

    gsap.set(video, {
        width: w,
        height: h
      })
};

window.addEventListener("unload", function() {
    sessionStorage.setItem(video, viewFlag);
  });