document.addEventListener("DOMContentLoaded", function() {
    const background = document.getElementById("home-background");
    const title = document.getElementById("home-title");
    const continue_text = document.getElementById("continue-text"); 
    const eating = document.getElementById("eating");
    const sightseeing = document.getElementById("sightseeing");
    const playing = document.getElementById("playing");

    async function menu() {
        return new Promise(resolve => {
            background.style.opacity = 0.7;
            title.innerHTML = "<h1 id='home-title'>WHAT DO YOU WANT TO DO?</h1>";
            continue_text.classList.remove("animate__flash", "animate__slower", "animate__infinite");
            continue_text.classList.add("animate__fadeOut");
            eating.classList.add("fade-in");
            sightseeing.classList.add("fade-in");
            playing.classList.add("fade-in");
            resolve();
        });
    }

    async function progress() {
        await new Promise(resolve => {
            document.addEventListener("click", resolve);
        });
        await menu();
    }

    progress();
});