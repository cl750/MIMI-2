document.addEventListener("DOMContentLoaded", function() {
    const background = document.getElementById("home-background");
    const text_container = document.getElementById("text-container");
    const title = document.getElementById("home-title");
    const continue_text = document.getElementById("continue-text"); 
    const menu_container = document.getElementById("menu-container");
    const eating = document.getElementById("eating");
    const sightseeing = document.getElementById("sightseeing");
    const playing = document.getElementById("playing");

    async function menu() {
        return new Promise(resolve => {
            title.style.borderColor = "transparent";
            title.innerHTML = "<h1 id='home-title'>WHAT KIND OF DATE ARE YOU FEELING?</h1>";
            resolve();         
        });
    }

    async function menu2() {
        return new Promise(resolve => {
            text_container.style.cursor = "default";
            menu_container.style.cursor = "default";
            background.classList.add("animate__animated", "animate__fadeIn", "animate__slower");
            title.classList.add("hidden");
            menu_container.classList.add("fade-in");
            eating.style.cursor = "pointer";
            sightseeing.style.cursor = "pointer";
            playing.style.cursor = "pointer";
            resolve();  
        });
    }

    async function progress() {
        await new Promise(resolve => setTimeout(resolve, 2250));
        continue_text.classList.remove("hidden");
        await new Promise(resolve => {
            document.addEventListener("click", resolve, {once : true});
        });
        continue_text.classList.add("hidden");
        await menu();
        await new Promise(resolve => setTimeout(resolve, 2250));
        continue_text.classList.remove("hidden");
        await new Promise(resolve => {
            document.addEventListener("click", resolve, {once : true});
        });
        continue_text.classList.add("hidden");
        await menu2();
    }

    progress();
});