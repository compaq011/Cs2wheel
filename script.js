
const items = [
    "Fracture.jpg",
    "Recoil.jpg",
    "Chroma2.jpg",
    "Vogue.jpg",
    "Revolution.jpg",
    "Ticket.jpg",
    "kilowatt.jpg",
    "Dreams.jpg"
];

const caseItems = document.getElementById("caseItems");
const openCaseBtn = document.getElementById("openCaseBtn");
const rollSound = document.getElementById("rollSound");
const resultText = document.getElementById("result");

// Daha fazla img yükleyelim ki uzun kayan bir alan olsun
function loadItems() {
    caseItems.innerHTML = "";
    for (let i = 0; i < 40; i++) {
        const img = document.createElement("img");
        img.src = `images/${items[Math.floor(Math.random() * items.length)]}`;
        caseItems.appendChild(img);
    }
}
loadItems();

openCaseBtn.addEventListener("click", () => {
    loadItems();
    let position = 0;
    let speed = 50;
    const slowDownPoint = 2000;
    const minSpeed = 2;
    const containerWidth = document.querySelector(".case-container").offsetWidth;
    const totalWidth = caseItems.scrollWidth;

    rollSound.currentTime = 0;
    rollSound.play();

    const startTime = Date.now();

    const interval = setInterval(() => {
        position -= speed;

        // Pozisyonu sınırla, item container soldan containerın solundan fazla kaymasın
        if (position < containerWidth - totalWidth) {
            position = containerWidth - totalWidth;
        }

        caseItems.style.left = position + "px";

        if (Date.now() - startTime > slowDownPoint && speed > minSpeed) {
            speed -= 0.3;
        }

        if (speed <= minSpeed) {
            clearInterval(interval);
            rollSound.pause();
            findWinner();
        }
    }, 16);
});

function findWinner() {
    const containerRect = document.querySelector(".case-container").getBoundingClientRect();
    const centerLineX = containerRect.left + containerRect.width / 2;
    const imgs = document.querySelectorAll(".case-items img");

    let closest = null;
    let closestDiff = Infinity;

    imgs.forEach(img => {
        const rect = img.getBoundingClientRect();
        const diff = Math.abs(rect.left + rect.width / 2 - centerLineX);
        if (diff < closestDiff) {
            closestDiff = diff;
            closest = img;
        }
    });

    if (closest) {
        const winnerBox = document.getElementById("winner-box");
        const winnerImg = document.getElementById("winner-img");
        const winnerName = document.getElementById("winner-name");

        const itemName = closest.src.split("/").pop().replace(".jpg", "");

        winnerImg.src = closest.src;
        winnerName.textContent = "Kazandığın item: " + itemName;

        // Kutuyu göster ve animasyon ver
        winnerBox.classList.add("show");

        // İstersen 5 saniye sonra otomatik gizle
        setTimeout(() => {
            winnerBox.classList.remove("show");
        }, 5000);

        // Sonucu metin olarak da altta göstermek istersen kaldırabilirsin:
        resultText.textContent = "";
    }
}(".case-items img");
