document.addEventListener("DOMContentLoaded", function() {
    const titleScreenConfig = {
        fadeInDuration: 1600,
        displayDuration: 3000,
        fadeOutDuration: 1600,
    };

    const titleScreen = document.getElementById("title-screen");

    titleScreen.classList.add("fade-in");
    setTimeout(() => {
            titleScreen.classList.add("fade-out");
            setTimeout(() => {
                window.location.href = "/home";
            }, titleScreenConfig.fadeOutDuration);
        }, titleScreenConfig.displayDuration);
});