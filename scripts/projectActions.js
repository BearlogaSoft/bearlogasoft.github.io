if (sessionStorage.bearMessage) {
    visitNumber = Number(sessionStorage.bearMessage);
    console.log(sessionStorage.bearMessage);
}

document.addEventListener("DOMContentLoaded", () => {
    if (visitNumber != 3) {
        $(".text").removeClass("hide");
    }
});