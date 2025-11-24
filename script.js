const announcementsCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTVEKnXC_xcQSK3-w-1khtOJQ4j0rbEsjdKtbqdjcJA5bs5_WTjTSTpQxkiCVg06a-c-1E0oTduvb16/pub?output=csv";
const gamesCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkv0zHUdhN-y48FkCmTeKwq6j-ZzOnvu0QPxZP4qeapyw0OfTY4jHZFpsLHD3zDWzDAcCkZKe8AY2K/pub?output=csv";

// Load Announcements
Papa.parse(announcementsCSV, {
  download: true,
  header: true,
  complete: function(results) {
    const container = document.getElementById('announcements');
    const today = new Date();
    results.data.forEach(item => {
      if(item.Message) {
        const msgDate = item.Date ? new Date(item.Date) : null;
        if(msgDate){ msgDate.setDate(msgDate.getDate()+1); if(msgDate < today) return; }
        const div = document.createElement('div');
        div.className = 'announcement';
        div.textContent = item.Message;
        container.appendChild(div);
      }
    });
  }
});

// Load Games
Papa.parse(gamesCSV, {
  download: true,
  header: true,
  complete: function(results) {
    const grid = document.getElementById('gameGrid');
    const today = new Date();
    grid.innerHTML = '';
    let hasGames = false;
    results.data.forEach(game => {
      if(game.Title && game.Thumbnail && game.Link){
        if(game.Date){ const gameDate = new Date(game.Date); gameDate.setDate(gameDate.getDate()+1); if(gameDate < today) return; }
        hasGames = true;
        const card = document.createElement('div');
        card.className='game-card';
        card.onclick = ()=>{
          document.getElementById('popupTitle').textContent = game.Title;
          document.getElementById('popupScore').textContent = game.Score || "Score not available";
          document.getElementById('popupLink').href = game.Link;
          document.getElementById('gamePopup').style.display='flex';
        };
        card.innerHTML = `<img src="${game.Thumbnail}" class="thumb"/>
                          <div class="info">
                            <div class="game-title">${game.Title}</div>
                            <div class="game-time">${game.Time||''}</div>
                          </div>`;
        grid.appendChild(card);
      }
    });
    if(!hasGames) {
      const msg = document.createElement('div');
      msg.style.color='white';
      msg.style.margin='20px';
      msg.textContent = "No games detected.";
      grid.appendChild(msg);
    }
  }
});

// Popup close
document.getElementById('closePopup').addEventListener('click', ()=>{
  document.getElementById('gamePopup').style.display='none';
});
window.addEventListener('click', (e)=>{
  if(e.target === document.getElementById('gamePopup')){
    document.getElementById('gamePopup').style.display='none';
  }
});
