const gamesCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkv0zHUdhN-y48FkCmTeKwq6j-ZzOnvu0QPxZP4qeapyw0OfTY4jHZFpsLHD3zDWzDAcCkZKe8AY2K/pub?output=csv";
const announceCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVEKnXC_xcQSK3-w-1khtOJQ4j0rbEsjdKtbqdjcJA5bs5_WTjTSTpQxkiCVg06a-c-1E0oTduvb16/pub?output=csv";

let allGames = [];
let currentLeague = null;

// Load ANNOUNCEMENTS
fetch(announceCSV)
    .then(res => res.text())
    .then(text => {
        const rows = text.trim().split("\n").map(r => r.split(","));
        const announcement = rows[1] ? rows[1][0] : "";
        document.getElementById("announcements").textContent = announcement || "No announcements available.";
    });

// Load GAMES
fetch(gamesCSV)
    .then(res => res.text())
    .then(text => {
        const rows = text.trim().split("\n").map(r => r.split(","));

        const headers = rows[0];
        const games = rows.slice(1).map(row => {
            let obj = {};
            headers.forEach((h,i) => obj[h] = row[i]);
            return obj;
        });

        allGames = games;
        makeTabs();
        showLeague(games[0].League);
    });

function makeTabs() {
    const leagues = [...new Set(allGames.map(g => g.League))];
    const tabsDiv = document.getElementById("tabs");
    tabsDiv.innerHTML = "";

    leagues.forEach(l => {
        const tab = document.createElement("div");
        tab.className = "tab";
        tab.textContent = l;
        tab.onclick = () => showLeague(l);
        tabsDiv.appendChild(tab);
    });
}

function showLeague(league) {
    currentLeague = league;
    const gamesDiv = document.getElementById("games");
    gamesDiv.innerHTML = "";

    const filtered = allGames.filter(g => g.League === league);

    if (filtered.length === 0) {
        gamesDiv.textContent = "No games available.";
        return;
    }

    filtered.forEach(game => {
        let div = document.createElement("div");
        div.className = "gameDiv";

        div.innerHTML = `
            <img src="${game.Image}">
            <h3>${game.Home} vs ${game.Away}</h3>
            <p>${game.Date}</p>
        `;

        div.onclick = () => openGamePopup(game);
        gamesDiv.appendChild(div);
    });
}

// POPUP
function openGamePopup(game) {
    document.getElementById("popupTitle").textContent = `${game.Home} vs ${game.Away}`;
    document.getElementById("popupScore").textContent = `Score: ${game.Score || "Not available"}`;
    document.getElementById("popupLink").href = game.Link;

    document.getElementById("gamePopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("gamePopup").style.display = "none";
}
