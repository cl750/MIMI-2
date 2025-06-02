document.addEventListener("DOMContentLoaded", function() {
    const background1 = document.getElementById("home-background1");
    const guide1 = document.getElementById("guide1");
    const guide2 = document.getElementById("guide2");
    const guide3 = document.getElementById("guide3");
    const guide4 = document.getElementById("guide4");
    const guide5 = document.getElementById("guide5");
    const tokens = document.getElementById("token-container");
    const play = document.getElementById("play");
    const restart = document.getElementById("restart");
    const win_screen = document.getElementById("win-screen");
    const background2 = document.getElementById("home-background2");
    const text_container = document.getElementById("text-container");
    const title = document.getElementById("home-title");
    const continue_text = document.getElementById("continue-text"); 
    const menu_container = document.getElementById("menu-container");
    const categories = document.getElementsByClassName("category");
    const combos = [["Eating", "Playing", "Sightseeing"], ["Morning", "Afternoon", "Evening"], ["Lazy", "Bouncy", "Studious"]];
    localStorage.setItem("continuation", false);
    var choices = [];

    async function menu() {
        return new Promise(resolve => {
            background1.classList.add("animate__animated", "animate__fadeIn", "animate__slower");
            if (!localStorage.getItem("continuation")) {
                setTimeout(() => {
                    guide1.classList.remove("hidden");
                    guide1.classList.add("animate__animated", "animate__fadeIn");
                    setTimeout(() => {
                        guide1.classList.add("animate__fadeOut");
                        setTimeout(() => {
                            guide2.classList.remove("hidden");
                            guide2.classList.add("animate__animated", "animate__fadeIn");
                            setTimeout(() => {
                                tokens.classList.remove("hidden");
                                tokens.classList.add("animate__animated", "animate__lightSpeedInLeft");
                                guide2.classList.add("animate__fadeOut");
                                setTimeout(() => {
                                    guide3.classList.remove("hidden");
                                    guide3.classList.add("animate__animated", "animate__fadeIn");
                                    setTimeout(() => {
                                        guide3.classList.add("animate__fadeOut");
                                        setTimeout(() => {
                                            guide4.classList.remove("hidden");
                                            guide4.classList.add("animate__animated", "animate__fadeIn");
                                            setTimeout(() => {
                                                guide4.classList.add("animate__fadeOut");
                                                setTimeout(() => {
                                                    guide5.classList.remove("hidden");
                                                    guide5.classList.add("animate__animated", "animate__fadeIn");
                                                    setTimeout(() => {
                                                        guide5.classList.add("animate__fadeOut");
                                                    }, 2000);
                                                }, 1500);
                                            }, 2000);
                                        }, 1500);
                                    }, 2000);
                                }, 1500);
                            }, 2000);
                        }, 1500);
                    }, 1500);
                }, 2000);
            }
            else {
                tokens.classList.remove("hidden");
                tokens.classList.add("animate__animated", "animate__bounceInLeft");
            }
            
            play.classList.remove("hidden");
            play.classList.add("animate__animated", "animate__rotateInUpLeft");
            
            play.addEventListener("click", function click() {
                if (window.tokenSystem.getTokens() > 0) {
                    window.tokenSystem.useToken();
                    play.removeEventListener("click", click);
                    play.classList.add("hidden");
                    resolve();
                }
            })
        });
    }

    async function menu2() {
        background2.classList.add("animate__animated", "animate__fadeIn", "animate__slower");
        title.style.display = "block";
        await new Promise(resolve => setTimeout(resolve, 2250));
        continue_text.classList.remove("hidden");
        await new Promise(resolve => setTimeout(resolve, 500));
        await new Promise(resolve => {
            document.addEventListener("click", resolve, {once : true});
        });
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

    async function result() {
        return new Promise(resolve => {
            if (window.jackpotSystem.checkMatch(choices)) {
                win_screen.style.display = "block";
            }
            else {
                restart.classList.remove("hidden");
                restart.classList.add("animate__animated", "animate__fadeIn");
                restart.addEventListener("click", function restart() {
                    localStorage.setItem("continuation", true);
                    location.reload();
                });
            }
            
        });
    }

    async function progress() {
        title.style.display = "none";
        await menu();
        await menu2();
        await decide_wrapper();
        await new Promise(resolve => {
            document.addEventListener("click", resolve, {once : true});
        });
        await new Promise(resolve => setTimeout(resolve, 500));
        document.querySelectorAll(".up-arrow, .down-arrow").forEach(element => { element.style.opacity = 0; });
        document.querySelectorAll(".category-wrapper").forEach(element => { element.classList.add("fade-out"); });
        result();
    }

    progress();
});