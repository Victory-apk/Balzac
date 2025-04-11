document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".carousel-track");
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let index = 0;
    const totalItems = items.length;
    const itemWidth = items[0].clientWidth;

    function updateCarousel() {
        track.style.transform = `translateX(${-index * itemWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % totalItems;
        updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    // Автопрокрутка каждые 3 секунды
    setInterval(() => {
        index = (index + 1) % totalItems;
        updateCarousel();
    }, 3000);
});
