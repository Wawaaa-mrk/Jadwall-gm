document.addEventListener('DOMContentLoaded', function () {
    const scheduleTable = document.getElementById('schedule-table');
    const filterDate = document.getElementById('filter-date');
    let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    let completedSchedules = JSON.parse(localStorage.getItem('completedSchedules')) || [];

    function renderSchedules(filteredSchedules) {
        scheduleTable.innerHTML = '';
        filteredSchedules.forEach((schedule, index) => {
            const row = document.createElement('tr');
            const formattedDate = new Date(schedule.tanggal).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            const participantsList = schedule.peserta
                .split(',')
                .map(peserta => `<li>${peserta.trim()}</li>`)
                .join('');

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${formattedDate}</td>
                <td>${schedule.waktu}</td>
                <td>${schedule.agenda}</td>
                <td>${schedule.tempat}</td>
                <td><ul>${participantsList}</ul></td>
                <td><button class="complete-schedule" data-index="${index}">✔️</button></td>
            `;
            scheduleTable.appendChild(row);
        });
    }

    renderSchedules(schedules);

    filterDate.addEventListener('input', function () {
        const filteredSchedules = schedules.filter(schedule => schedule.tanggal === filterDate.value);
        renderSchedules(filteredSchedules);
    });

    scheduleTable.addEventListener('click', function (e) {
        if (e.target.classList.contains('complete-schedule')) {
            const index = e.target.getAttribute('data-index');
            const [completed] = schedules.splice(index, 1);
            completedSchedules.push(completed);

            localStorage.setItem('schedules', JSON.stringify(schedules));
            localStorage.setItem('completedSchedules', JSON.stringify(completedSchedules));

            alert('Jadwal dipindahkan ke rekap agenda!');
            renderSchedules(schedules);
        }
    });
});
