document.addEventListener("DOMContentLoaded", function() {
    const token_count = document.getElementById("token-count");
    if (localStorage.getItem("tokens") == null) {
        var tokens = 3;
    }
    else {
        var tokens = parseInt(localStorage.getItem("tokens"));
    }
    let lastVisited = localStorage.getItem('lastTokenUpdate') 
        ? new Date(localStorage.getItem('lastTokenUpdate')) 
        : new Date();

    function updateTokenDisplay() {
        localStorage.setItem("tokens", tokens.toString());
        token_count.innerHTML = "<h1 class='token-count' id='token-count'>" + tokens + "</h1>";
    }

    function checkDaily() {
        const now = new Date();
        const timeDiff = now - lastVisited;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        if (daysDiff >= 1) {
            tokens += 3;
            lastVisited = now;
            localStorage.setItem("lastVisited", lastVisited);
            updateTokenDisplay();
        }
    }

    function useToken() {
        tokens--;
        updateTokenDisplay();
    }

    window.tokenSystem = {
        useToken: useToken,
        getTokens: () => tokens
    }

    setInterval(checkDaily, 60000);
    updateTokenDisplay();
});