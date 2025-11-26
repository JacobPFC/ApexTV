const announcementsCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVEKnXC_xcQSK3-w-1khtOJQ4j0rbEsjdKtbqdjcJA5bs5_WTjTSTpQxkiCVg06a-c-1E0oTduvb16/pub?output=csv";

const gamesCSV =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkv0zHUdhN-y48FkCmTeKwq6j-ZzOnvu0QPxZP4qeapyw0OfTY4jHZFpsLHD3zDWzDAcCkZKe8AY2K/pub?output=csv";

// Load announcements
Papa.parse(announcementsCSV, {
  download: true,
  header: true,
  complete: function (results) {
    const container = document.getElementById("announcements");
    const today = new Date();

    results.data.forEach((item) => {
      if (item.Message) {
        const msgDate = item.Date ? new Date(item.Date) : null;

        if (msgDate) {
          msgDate.setDate(msgDate.getDate() + 1);
          if (msgDate < today) return;
        }

        const div = document.createElement("div");
        div.className = "announcement";
        div.textContent = item.Message;
        container.appendChild(div);
      }
    });
  }
});

// Load games
Papa.parse(gamesCSV, {
  download: true,
  header: true,
  complete: function (results) {
    const grid = document.getElementById("gameGrid");
    const today = new Date();

    grid.innerHTML = "";

    results.data.forEach((game) => {
      if (game.Title && game.Thumbnail && game.Link) {

        const card = document.createElement("div");
        card.className = "game-card";

        card.innerHTML = `
          <img src="${game.Thumbnail}" class="thumb">
          <div class="info">
            <div class="game-title">${game.Title}</div>
            <div class="game-time">${game.Time || ""}</div>
            <div class="game-date">${game.Date || ""}</div>
            ${game.Live === "true" ? '<div class="live-tag">LIVE</div>' : ""}
          </div>
        `;

        // Open popup instead of opening link
        card.addEventListener("click", () => openPopup(game));

        grid.appendChild(card);
      }
    });
  }
});

// Popup Logic
function openPopup(game) {
  document.getElementById("popupTitle").textContent = game.Title;
  document.getElementById("popupDate").textContent = game.Date || "";
  document.getElementById("popupTime").textContent = game.Time || "";
  document.getElementById("popupWatch").href = game.Link;

  document.getElementById("popupOverlay").style.display = "flex";
}

document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popupOverlay").style.display = "none";
});
