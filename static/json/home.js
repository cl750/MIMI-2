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
            background1.classList.add("animate__animated", "animate__fadeIn", "animate__slower");
        });
    }

    async function menu2() {
        continue_text.classList.add("hidden");
        await new Promise(resolve => {
            title.style.borderColor = "transparent";
            setTimeout(() => {
                title.innerHTML = "<h1 id='home-title'>WHAT KIND OF DATE ARE YOU FEELING?</h1>";
                resolve();    
            }, 250);
        });
        await new Promise(resolve => setTimeout(resolve, 2250));
        continue_text.classList.remove("hidden");
        await new Promise(resolve => setTimeout(resolve, 500));
        await new Promise(resolve => {
            document.addEventListener("click", resolve, {once : true});
        });
        continue_text.classList.add("hidden");
        return new Promise(resolve => {
            text_container.style.cursor = "default";
            menu_container.style.cursor = "default";
            title.style.transition = "0.4s ease-in-out";
            title.style.opacity = 0;
            setTimeout(() => {
                title.classList.add("hidden");
                menu_container.classList.add("fade-in");
                resolve();  
            }, 500);            
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
                    else {
                        categories.item(currentCat).style.opacity = 1;
                        categories.item(currentCat).style.pointerEvents = "auto";
                    }
                }
            }            
        });
    }

    async function progress() {
        await menu();
        background2.classList.add("animate__animated", "animate__fadeIn", "animate__slower");
        title.style.display = "block";
        await new Promise(resolve => setTimeout(resolve, 2250));
        continue_text.classList.remove("hidden");
        await new Promise(resolve => setTimeout(resolve, 500));
        await new Promise(resolve => {
            document.addEventListener("click", resolve, {once : true});
        });
        await menu2();
        await decide_wrapper();
        await new Promise(resolve => {
            document.addEventListener("click", resolve, {once : true});
        });
        await new Promise(resolve => setTimeout(resolve, 500));
        document.querySelectorAll(".up-arrow, .down-arrow").forEach(element => { element.style.opacity = 0; });
        document.querySelectorAll(".category-wrapper").forEach(element => { element.classList.add("fade-out"); });
    }

    progress();
});