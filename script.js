// Handle tab clicks
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const league = tab.dataset.league;

        // Always show popup no matter what
        document.getElementById('popupTitle').textContent = league + " Match";
        document.getElementById('popupScore').textContent = "Score not available";
        document.getElementById('popupLink').href = "game.html?league=" + league;

        document.getElementById('popup').style.display = "block";
    });
});

// Close popup
document.getElementById('closePopup').addEventListener('click', () => {
    document.getElementById('popup').style.display = "none";
});

// Close popup when clicking outside the box
window.addEventListener('click', (event) => {
    if (event.target === document.getElementById('popup')) {
        document.getElementById('popup').style.display = "none";
    }
});
