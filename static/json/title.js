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
            setTimeout(resolve, 2000);
        });
    }

    async function loading() {
        return new Promise((resolve) => {
            const states = ["<h1>Loading.<h1>", "<h1>Loading..<h1>", "<h1>Loading...<h1>"];
            var stage = 0;
            loading_text.innerHTML = states[stage];
            load = setInterval(() => {
                stage = (stage + 1) % states.length;
                loading_text.innerHTML = states[stage];
                console.log(stage);
            }, 250);
            setTimeout(() => {
                clearInterval(load);
                loading_text.innerHTML = "<h1>Loaded!<h1>";
                loading_text.classList.add("animate__animated", "animate__tada", "loaded-text");
                resolve();
            }, 3000);
        });
    }

    async function waitForClick() {
        return new Promise((resolve) => {
            document.addEventListener("click", function clicked() {
                document.removeEventListener("click", clicked);
                loading_text.classList.remove("loaded-text");
                loading_text.classList.add("zoom");
                resolve();
            }, {once: true});
            setTimeout(() => {instruction.classList.add("fade-in")}, 3000);
        });
    }

    const durations = {
        fadeInDuration: 1250,
        displayDuration: 2000,
        fadeOutDuration: 1250,
    };

    const text = document.getElementById("title-text");
    const background = document.getElementById("title-background");
    const logogroup = document.getElementById("title-logogroup");
    const loading_container = document.getElementById("loading-container");
    const loading_text = document.getElementById("loading-text");
    const instruction = document.getElementById("instruction");
    const elements = [text, logogroup];


    async function titleAnimations() {
        await animate(text, true);
        await animate(background, false);
        await animate(logogroup, false);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await fadeAll(elements);
        await new Promise(resolve => setTimeout(resolve, 250));
        await fadeAll([background]);
        loading_container.style.opacity = 1;
        await loading(4000);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await waitForClick();
        window.location.href = "/home";
    }

    titleAnimations();
});