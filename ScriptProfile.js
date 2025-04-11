// Проверка токена
let token = localStorage.getItem("jwtToken");
if (!token) {
    window.location.href = "Main.html";
} else {
    let user = JSON.parse(token);
    document.getElementById("username").innerText = "Добро пожаловать, " + user.name;
}

// Выход из системы
document.getElementById("logout").addEventListener("click", function() {
    localStorage.removeItem("jwtToken");
    window.location.href = "Main.html";
});

// Обработка кнопки корзины
const cartModal = document.getElementById("cartModal");
document.getElementById("cartButton").addEventListener("click", function() {
    cartModal.style.display = "block";
});
document.querySelector(".close").addEventListener("click", function() {
    cartModal.style.display = "none";
});

// Сохранение профиля
document.getElementById("profileForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let profileData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        birthdate: document.getElementById("birthdate").value
    };
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    alert("Данные сохранены!");
});

// Загрузка данных профиля
window.onload = function() {
    let savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
        savedProfile = JSON.parse(savedProfile);
        document.getElementById("fullName").value = savedProfile.fullName || "";
        document.getElementById("email").value = savedProfile.email || "";
        document.getElementById("phone").value = savedProfile.phone || "";
        document.getElementById("birthdate").value = savedProfile.birthdate || "";
    }
};

// Запуск таймера доставки
document.getElementById("orderButton").addEventListener("click", function() {
    let deliveryTime = new Date(document.getElementById("deliveryTime").value);
    startCountdown(deliveryTime);
    localStorage.setItem("deliveryTime", deliveryTime);
    alert("Заказ оформлен!");
    cartModal.style.display = "none";
});

// Таймер вручную
document.getElementById("startTimer").addEventListener("click", function() {
    let manualTime = new Date(document.getElementById("manualTime").value);
    startCountdown(manualTime);
    localStorage.setItem("deliveryTime", manualTime);
});

function startCountdown(deliveryTime) {
    function updateCountdown() {
        let now = new Date();
        let diff = deliveryTime - now;

        if (diff <= 0) {
            document.getElementById("countdown").innerText = "Доставка уже должна быть!";
            clearInterval(timer);
            return;
        }

        let hours = Math.floor(diff / (1000 * 60 * 60));
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerText = `${hours}ч ${minutes}м ${seconds}с`;
    }

    updateCountdown();
    let timer = setInterval(updateCountdown, 1000);
}

// Проверка сохраненного таймера
let savedTime = localStorage.getItem("deliveryTime");
if (savedTime) {
    startCountdown(new Date(savedTime));
}
