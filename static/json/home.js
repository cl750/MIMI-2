document.addEventListener("DOMContentLoaded", function() {
    const background = document.getElementById("home-background");
    const title = document.getElementById("home-title");
    const continue_text = document.getElementById("continue-text"); 
    const eating = document.getElementById("eating");
    const sightseeing = document.getElementById("sightseeing");
    const playing = document.getElementById("playing");

    async function menu() {
        return new Promise(resolve => {
            background.classList.add("fade-in");
            continue_text.classList.remove("animate__flash", "animate__slower", "animate__infinite");
            continue_text.classList.add("animate__fadeOut");
            title.style.borderColor = "transparent";
            title.classList.add("fade-out");
            title.innerHTML = "<h1 id='home-title'>WHAT KIND OF DATE ARE YOU FEELING?</h1>";
            title.classList.add("fade-in");
            document.body.style.cursor = "pointer";
            setTimeout(() => {
                eating.classList.add("fade-in");
                sightseeing.classList.add("fade-in");
                playing.classList.add("fade-in");
                resolve();
            }, 1000);            
        });
    }

    async function progress() {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await new Promise(resolve => {
            document.addEventListener("click", resolve);
        });
        await menu();
    }

    progress();
});