document.getElementById('export-btn').addEventListener('click', function() {
    const completedSchedules = JSON.parse(localStorage.getItem('completedSchedules')) || [];
    
    let tableContent = '<table border="1"><thead><tr><th>No</th><th>Hari dan Tanggal</th><th>Waktu</th><th>Agenda</th><th>Tempat</th><th>Peserta</th><th>Status</th></tr></thead><tbody>';

    completedSchedules.forEach((schedule, index) => {
        const date = new Date(schedule.tanggal);
        const formattedDate = date.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

        tableContent += `<tr>
            <td>${index + 1}</td>
            <td>${formattedDate}</td>
            <td>${schedule.waktu}</td>
            <td>${schedule.agenda}</td>
            <td>${schedule.tempat}</td>
            <td>${schedule.peserta}</td>
            <td>Selesai</td>
        </tr>`;
    });

    tableContent += '</tbody></table>';

    const blob = new Blob([tableContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Rekap_Agenda.xls';
    link.click();
});
