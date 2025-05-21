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

    async function fadeAll(elements) {
        return new Promise((resolve) => {
            elements.forEach((item) => { item.classList.add("fade-out"); });
            resolve();
        });
    }

    const durations = {
        fadeInDuration: 1250,
        displayDuration: 1250,
        fadeOutDuration: 1250,
    };

    const text1 = document.getElementById("title-text1");
    const background = document.getElementById("title-background");
    const logogroup = document.getElementById("title-logogroup");
    const elements = [text1, background, logogroup];


    async function titleAnimations() {
        await animate(text1, true);
        await animate(background, false);
        await animate(logogroup, false);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await fadeAll(elements);
        window.location.href = "/home";
    }

    titleAnimations();
});