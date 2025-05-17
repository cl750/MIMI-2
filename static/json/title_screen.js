document.addEventListener("DOMContentLoaded", function() {
    const titleScreenConfig = {
        fadeInDuration: 1500,
        displayDuration: 3000,
        fadeOutDuration: 1500,
    };

    const titleScreen = document.getElementById("title-screen");

    setTimeout(() => {
        titleScreen.classList.add("fade-in");
        setTimeout(() => {
                titleScreen.classList.add("fade-out");
                setTimeout(() => {
                    titleScreen.style.display = "none";
                }, titleScreenConfig.fadeOutDuration);
            }, titleScreenConfig.displayDuration);
    }, titleScreenConfig.fadeInDuration);
});