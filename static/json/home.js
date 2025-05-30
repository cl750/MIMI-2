document.addEventListener("DOMContentLoaded", function() {
    const background1 = document.getElementById("home-background1");
    const background2 = document.getElementById("home-background2");
    const text_container = document.getElementById("text-container");
    const title = document.getElementById("home-title");
    const continue_text = document.getElementById("continue-text"); 
    const menu_container = document.getElementById("menu-container");
    const categories = document.getElementsByClassName("category");
    const combos = [["Eating", "Playing", "Sightseeing"], ["Morning", "Afternoon", "Evening"], ["Lazy", "Bouncy", "Studious"]];
    var choices = [];

    async function menu() {
        return new Promise(resolve => {
            title.style.borderColor = "transparent";
            setTimeout(() => {
                title.innerHTML = "<h1 id='home-title'>WHAT KIND OF DATE ARE YOU FEELING?</h1>";
                resolve();    
            }, 250);
        });
    }

    async function menu2() {
        return new Promise(resolve => {
            text_container.style.cursor = "default";
            menu_container.style.cursor = "default";
            title.classList.add("hidden");
            menu_container.classList.add("fade-in");
            resolve();  
        });
    }

    async function decide_wrapper() {
        return new Promise(resolve => {
            var currentCat = 0;
            categories.item(currentCat).style.opacity = 1;
            categories.item(currentCat).style.pointerEvents = "auto";
            window.decide = function(categoryNum, choiceNum) {
                if (categoryNum == currentCat) {
                    categories.item(currentCat).style.opacity = 0.6;
                    categories.item(currentCat).style.pointerEvents = "none";
                    choices[categoryNum] = combos[categoryNum][choiceNum];
                    currentCat++;
                    if (currentCat > 2) {
                        resolve();
                    }
                    categories.item(currentCat).style.opacity = 1;
                    categories.item(currentCat).style.pointerEvents = "auto";
                }
            }            
        });
    }

    async function progress() {
        background1.classList.add("animate__animated", "animate__fadeIn", "animate__slower");
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
        await decide_wrapper();
        console.log(choices.toString());
    }

    progress();
});