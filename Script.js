let cart = [];
let dishes = [
    {img: "Маргарита.jpg", name: "Пицца Маргарита", desc: "Томатный соус, моцарелла, базилик"},
    {img: "Карбонара.jpg", name: "Паста Карбонара", desc: "Спагетти, бекон, сливки, сыр"},
    {img: "Чизбургер.jpg", name: "Чизбургер", desc: "Говяжья котлета, сыр, салат, соус"},
    {img: "Филадельфия.jpg", name: "Суши Филадельфия", desc: "Лосось, сливочный сыр, нори, рис"},
    {img: "Стейк.jpg", name: "Стейк", desc: "Говядина, специи, соус BBQ"},
    {img: "Цезарь.jpg", name: "Салат Цезарь", desc: "Курица, салат, сыр пармезан, соус"},
    {img: "Суп.jpg", name: "Томатный суп", desc: "Томаты, базилик, сливки"},
    {img: "Торт.jpg", name: "Шоколадный торт", desc: "Шоколад, крем, вишня"},
    {img: "Капучино.jpeg", name: "Капучино", desc: "Эспрессо, молоко, пенка"},
    {img: "Чай.jpg", name: "Чай с мятой", desc: "Чай, мята, лимон"},
    {img: "Сок.jpg", name: "Апельсиновый сок", desc: "Свежевыжатый апельсин"},
    {img: "Вино.jpg", name: "Красное вино", desc: "Выдержанное виноградное вино"}
];

// Добавляем 988 карточек Филадельфии
for (let i = 0; i < 988; i++) {
    dishes.push({img: "Филадельфия.jpg", name: "Суши Филадельфия", desc: "Лосось, сливочный сыр, нори, рис"});
}

let currentPage = 1;
let itemsPerPage = 100;

document.addEventListener("DOMContentLoaded", function() {
    renderMenu();
    setupPagination();
    
    document.getElementById('items-per-page').addEventListener('change', function() {
        itemsPerPage = parseInt(this.value);
        currentPage = 1;
        renderMenu();
        setupPagination();
    });
    
    // Модальное окно
    const modal = document.getElementById("modal");
    const addDishBtn = document.createElement("div");
    addDishBtn.className = "dish add-dish";
    addDishBtn.innerHTML = '<div class="plus">+</div>';
    document.getElementById('menu-container').prepend(addDishBtn);
    
    addDishBtn.addEventListener('click', function() {
        modal.style.display = "block";
    });
    
    document.querySelector('.close').addEventListener('click', function() {
        modal.style.display = "none";
    });
    
    document.getElementById('save-dish').addEventListener('click', function() {
        const name = document.getElementById('dish-name').value;
        const desc = document.getElementById('dish-description').value;
        const imageInput = document.getElementById('dish-image');
        
        if (name && desc) {
            let imgSrc = "placeholder.jpg"; // Заглушка, если изображение не выбрано
            if (imageInput.files && imageInput.files[0]) {
                imgSrc = URL.createObjectURL(imageInput.files[0]);
            }
            
            dishes.unshift({img: imgSrc, name, desc});
            modal.style.display = "none";
            document.getElementById('dish-name').value = "";
            document.getElementById('dish-description').value = "";
            document.getElementById('dish-image').value = "";
            currentPage = 1;
            renderMenu();
            setupPagination();
        } else {
            alert("Пожалуйста, заполните все поля");
        }
    });
});

function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = dishes.slice(start, end);
    
    paginatedItems.forEach((dish, index) => {
        const dishElement = document.createElement('div');
        dishElement.className = 'dish';
        dishElement.innerHTML = `
            <img src="${dish.img}" alt="${dish.name}">
            <h3>${dish.name}</h3>
            <p>${dish.desc}</p>
            <button class="delete-btn" data-index="${start + index}">×</button>
        `;
        container.appendChild(dishElement);
    });
    
    // Добавляем кнопку добавления в начало
    const addDishBtn = document.createElement("div");
    addDishBtn.className = "dish add-dish";
    addDishBtn.innerHTML = '<div class="plus">+</div>';
    container.prepend(addDishBtn);
    
    addDishBtn.addEventListener('click', function() {
        document.getElementById('modal').style.display = "block";
    });
    
    // Добавляем обработчики удаления
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            dishes.splice(index, 1);
            renderMenu();
            setupPagination();
        });
    });
}

function setupPagination() {
    const pageCount = Math.ceil(dishes.length / itemsPerPage);
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';
    
    for (let i = 1; i <= pageCount; i++) {
        const pageLink = document.createElement('button');
        pageLink.innerText = i;
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', function() {
            currentPage = i;
            renderMenu();
            setupPagination();
        });
        pagination.appendChild(pageLink);
    }
}

function addToCart(item, price) {
    cart.push({ item, price });
    alert(`${item} добавлен в корзину!`);
}