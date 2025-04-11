document.addEventListener("DOMContentLoaded", function () {
    let calendarContainer = document.getElementById("calendar");
    let now = new Date();
    let month = now.getMonth();
    let year = now.getFullYear();

    function renderCalendar(month, year) {
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let firstDay = new Date(year, month, 1).getDay();

        let calendarHTML = `<h3>${now.toLocaleString('ru-RU', { month: 'long' })} ${year}</h3>`;
        calendarHTML += "<div class='calendar-grid'>";

        for (let i = 0; i < firstDay; i++) {
            calendarHTML += "<div class='calendar-day empty'></div>";
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendarHTML += `<div class='calendar-day'>${day}</div>`;
        }

        calendarHTML += "</div>";
        calendarContainer.innerHTML = calendarHTML;
    }

    renderCalendar(month, year);
});
