document.getElementById('schedule-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const hari = document.getElementById('hari').value;
    const tanggal = document.getElementById('tanggal').value;
    const waktu = document.getElementById('waktu').value;
    const agenda = document.getElementById('agenda').value;
    const tempat = document.getElementById('tempat').value;
    const peserta = document.getElementById('peserta').value;

    const newSchedule = { hari, tanggal, waktu, agenda, tempat, peserta };

    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    schedules.push(newSchedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));

    alert('Jadwal berhasil ditambahkan!');
    this.reset();
});

document.getElementById('peserta').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        let participants = document.getElementById('peserta').value.split(",");
        document.getElementById('peserta').value = participants.join(", ");
    }
});
