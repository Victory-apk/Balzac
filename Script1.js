document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");

    // Маска ввода номера телефона
    phoneInput.addEventListener("input", function () {
        let value = phoneInput.value.replace(/\D/g, ""); // Удаляем все нецифровые символы
        if (value.startsWith("7")) {
            value = value.substring(1); // Убираем лишнюю 7, если она уже введена
        }
        value = value.substring(0, 10); // Ограничение на 10 цифр (без учета +7)
        
        let formattedValue = "+7 ";
        if (value.length > 0) formattedValue += `(${value.substring(0, 3)}`;
        if (value.length > 3) formattedValue += `) ${value.substring(3, 6)}`;
        if (value.length > 6) formattedValue += `-${value.substring(6, 8)}`;
        if (value.length > 8) formattedValue += `-${value.substring(8, 10)}`;
        
        phoneInput.value = formattedValue;
    });

    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const phone = phoneInput.value;
        const password = document.getElementById("password").value;

        console.log("Phone:", phone);
        console.log("Password:", password);

        if (phone.length < 16 || password.length < 6) {
            alert("Введите корректные данные!");
            return;
        }

        // Симуляция проверки (в реальности должен быть сервер)
        if (phone === "+7 (900) 123-45-67" && password === "123456") {
            const user = { name: "Иван Иванов", phone };

            console.log("User object:", user);

            // Сохранение токена (без btoa, так как он не поддерживает кириллицу)
            localStorage.setItem("jwtToken", JSON.stringify(user));

            // Перенаправление на страницу профиля
            window.location.href = "Profile.html";
        } else {
            alert("Неверный логин или пароль");
        }
    });
});
