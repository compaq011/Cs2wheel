
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

// Itemları ekrana ekle (2 tur koyalım ki döngü gibi olsun)
function loadItems() {
    caseItems.innerHTML = "";
    for (let i = 0; i < 20; i++) {
        const img = document.createElement("img");
        img.src = `images/${items[Math.floor(Math.random() * items.length)]}`;
        caseItems.appendChild(img);
    }
}
loadItems();

openCaseBtn.addEventListener("click", () => {
    loadItems();
    let position = 0;
    let speed = 50; // başlangıç hızı
    const slowDownPoint = 2000; // ne kadar sonra yavaşlamaya başlayacak (ms)
    const minSpeed = 2; // en yavaş hız

    rollSound.currentTime = 0;
    rollSound.play();

    const startTime = Date.now();

    const interval = setInterval(() => {
        position -= speed;
        caseItems.style.left = position + "px";

        if (Date.now() - startTime > slowDownPoint && speed > minSpeed) {
            speed -= 0.2; // yavaşlama
        }

        if (speed <= minSpeed) {
            clearInterval(interval);
            rollSound.pause();
            findWinner();
        }
    }, 16);
});

function findWinner() {
    const center = document.querySelector(".case-container").offsetWidth / 2;
    const imgs = document.querySelectorAll(".case-items img");
    let closest = null;
    let closestDiff = Infinity;

    imgs.forEach(img => {
        const rect = img.getBoundingClientRect();
        // window.innerWidth/2 yerine case-container'ın tam ortasını hesaplıyoruz
        const containerRect = document.querySelector(".case-container").getBoundingClientRect();
        const centerLineX = containerRect.left + containerRect.width / 2;
        const diff = Math.abs(rect.left + rect.width / 2 - centerLineX);
        if (diff < closestDiff) {
            closestDiff = diff;
            closest = img;
        }
    });

    if (closest) {
        resultText.textContent = "Kazandığın item: " + closest.src.split("/").pop().replace(".jpg", "");
    }
}
