
document.addEventListener('wheel', function (event) {
    var pageId = document.getElementById('page-id').innerHTML;
    if (event.deltaY == -100) {
        switch (pageId) {
            case 'noirball4': document.location.href = "../index.html"; break;
            case 'mmetod2': document.location.href = "../project/noirball.html"; break;
            case 'rentretrocar4': document.location.href = "../project/mmetod.html"; break;
            case 'delphi6': document.location.href = "../project/rentretrocar.html"; break;
            case 'calculator4': document.location.href = "../project/studyofretrocars.html"; break;
            case 'conclusion': document.location.href = "./project/calculator.html"; break;
        }
    }
    else if (event.deltaY == 100) {
        switch (pageId) {
            case 'index': document.location.href = "./project/noirball.html"; break;
            case 'noirball4': document.location.href = "../project/mmetod.html"; break;
            case 'mmetod2': document.location.href = "../project/rentretrocar.html"; break;
            case 'rentretrocar4': document.location.href = "../project/studyofretrocars.html"; break;
            case 'delphi6': document.location.href = "../project/calculator.html"; break;
            case 'calculator4': document.location.href = "../conclusion.html"; break;
        }
    }
});

