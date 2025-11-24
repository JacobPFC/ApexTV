// CSV links
const gamesCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkv0zHUdhN-y48FkCmTeKwq6j-ZzOnvu0QPxZP4qeapyw0OfTY4jHZFpsLHD3zDWzDAcCkZKe8AY2K/pub?output=csv";
const announcementsCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVEKnXC_xcQSK3-w-1khtOJQ4j0rbEsjdKtbqdjcJA5bs5_WTjTSTpQxkiCVg06a-c-1E0oTduvb16/pub?output=csv";

// Convert CSV to objects
function parseCSV(text) {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map(row => {
        const values = row.split(",");
        return Object.fromEntries(headers.map((h, i) => [h.trim(), values[i]?.trim()]));
    });
}

// Load games
fetch(gamesCSV)
    .then(res => res.text())
    .then(data => {
        const games = parseCSV(data);
        const list = document.getElementById("gameList");
        list.innerHTML = "";

        if (games.length === 0) {
            list.innerHTML = "<p>No games available.</p>";
            return;
        }

        games.forEach(game => {
            const tab = document.createElement("div");
            tab.className = "game-tab";
            tab.onclick = () => openGamePopup(game);

            tab.innerHTML = `
                <img src="${game.Thumbnail}" class="thumbnail">
                <div class="game-info">
                    <div class="game-title">${game.Title}</div>
                    <div class="game-time">${game.Time || ""}</div>
                </div>
            `;

            list.appendChild(tab);
        });
    });

// Load announcements
fetch(announcementsCSV)
    .then(res => res.text())
    .then(data => {
        const ann = parseCSV(data);
        const list = document.getElementById("announcementList");
        list.innerHTML = "";

        ann.forEach(a => {
            const div = document.createElement("div");
            div.textContent = a.Text;
            list.appendChild(div);
        });
    });

// Popup functions
function openGamePopup(game) {
    document.getElementById("popupTitle").textContent = game.Title;
    document.getElementById("popupScore").textContent = game.Score || "Score unavailable";
    document.getElementById("popupLink").href = game.Link;

    document.getElementById("gamePopup").style.display = "flex";
}

function closePopup() {
    document.getElementById("gamePopup").style.display = "none";
}
