document.addEventListener("DOMContentLoaded", function() {
    const combos = [
        ["Eating", "Playing", "Sightseeing"],
        ["Morning", "Afternoon", "Evening"],
        ["Lazy", "Bouncy", "Studious"]
    ];

    let cachedJackpot = null;

    function generateDailyJackpot() {
        // First, check if we have a cached jackpot
        if (cachedJackpot) {
            return cachedJackpot;
        }

        const now = new Date();
        const today = now.toDateString();
        const lastUpdate = localStorage.getItem('lastJackpotDate');
        const storedJackpot = localStorage.getItem('dailyJackpot');

        // If we have both a stored date and jackpot, and it's still the same day
        if (lastUpdate === today && storedJackpot) {
            cachedJackpot = JSON.parse(storedJackpot);
            return cachedJackpot;
        }

        // Generate new jackpot if it's a new day or no jackpot exists
        const jackpot = [
            combos[0][Math.floor(Math.random() * 3)],
            combos[1][Math.floor(Math.random() * 3)],
            combos[2][Math.floor(Math.random() * 3)]
        ];
        
        // Store new jackpot and date
        localStorage.setItem('dailyJackpot', JSON.stringify(jackpot));
        localStorage.setItem('lastJackpotDate', today);
        
        cachedJackpot = jackpot;
        console.log("New daily jackpot generated:", jackpot);
        return jackpot;
    }

    // Initialize daily jackpot on page load
    generateDailyJackpot();
    console.log(generateDailyJackpot());
    
    window.jackpotSystem = {
        getJackpot: () => generateDailyJackpot(),
        checkMatch: (userChoices) => {
            const jackpot = generateDailyJackpot();
            return jackpot.every((item, index) => item === userChoices[index]);
        }
    };
});