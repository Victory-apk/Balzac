const cities = [
    "Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Казань", 
    "Челябинск", "Омск", "Самара", "Ростов-на-Дону", "Уфа", "Хабаровск", "Владивосток"
];

const streets = [
    "Ленина", "Советская", "Мира", "Центральная", "Школьная", "Садовая", "Молодежная", "Набережная", 
    "Гагарина", "Спортивная", "Тургенева", "Карла Маркса", "Муравьева-Амурского", "Льва Толстого", 
    "Серышева", "Краснореченская", "Запарина", "Шевченко", "Волочаевская", "Лермонтова", "Суворова", 
    "Фрунзе", "Пушкина", "Амурский бульвар", "Калинина", "Дикопольцева", "Знаменщикова", 
    "Восточное шоссе", "Выборгская", "Павловича", "Воронежская", "Суворова", "Прогрессивная", 
    "Засыпная", "Дальневосточная", "Курчатова", "Оборонная", "Некрасова", "Пионерская", "Красная", 
    "Тихоокеанская", "Матвеевское шоссе", "Судостроительная", "Автономная"
];

function setupAutoComplete(inputId, listId, dataList) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);

    input.addEventListener("input", function() {
        const query = input.value.toLowerCase();
        list.innerHTML = "";

        if (query.length === 0) {
            return;
        }

        const matches = dataList.filter(item => item.toLowerCase().startsWith(query));
        matches.forEach(match => {
            const li = document.createElement("li");
            li.textContent = match;
            li.addEventListener("click", () => {
                input.value = match;
                list.innerHTML = "";
            });
            list.appendChild(li);
        });
    });

    document.addEventListener("click", function(event) {
        if (!input.contains(event.target) && !list.contains(event.target)) {
            list.innerHTML = "";
        }
    });
}

setupAutoComplete("city", "cityList", cities);
setupAutoComplete("street", "streetList", streets);
