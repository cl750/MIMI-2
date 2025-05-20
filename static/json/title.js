document.addEventListener("DOMContentLoaded", function() {
    async function animate(object, fadeOut) {
        return new Promise((resolve) => {
            object.classList.add("fade-in");
            setTimeout(() => {
                if (fadeOut) {
                    setTimeout(() => {
                    object.classList.add("fade-out");
                    setTimeout(resolve, durations.fadeOutDuration);
                    }, durations.displayDuration);
                }
                else {
                    resolve();
                }
            }, durations.fadeInDuration);
        })
    }

    const durations = {
        fadeInDuration: 1250,
        displayDuration: 1250,
        fadeOutDuration: 1250,
    };

    const text1 = document.getElementById("title-text1");
    const background = document.getElementById("title-background");
    const logogroup = document.getElementById("title-logogroup");


    async function titleAnimations() {
        await animate(text1, true);
        await animate(background, false);
        await animate(logogroup, false);
        // window.location.href = "/home";
    }

    titleAnimations();
});