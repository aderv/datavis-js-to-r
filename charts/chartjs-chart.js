// charts/chartjs-chart.js
export function renderChartJS(containerId, isModal = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = '<canvas></canvas>'; // Asegurar que el canvas esté limpio
    const canvas = container.querySelector('canvas');

    const data = {
        labels: ['Desarrollo', 'Marketing', 'Ventas', 'Soporte', 'Diseño', 'Admin'],
        datasets: [{
            label: 'Equipo A',
            data: [65, 59, 90, 81, 56, 55],
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgb(59, 130, 246)',
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointBorderColor: '#fff',
        }, {
            label: 'Equipo B',
            data: [28, 48, 40, 19, 96, 27],
            fill: true,
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            borderColor: 'rgb(239, 68, 68)',
            pointBackgroundColor: 'rgb(239, 68, 68)',
            pointBorderColor: '#fff',
        }]
    };
    new Chart(canvas, {
        type: 'radar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: isModal, text: 'Comparativa de Habilidades (Chart.js)', color: 'white' },
                legend: { labels: { color: '#d1d5db' } }
            },
            scales: {
                r: {
                    angleLines: { color: '#4b5563' },
                    grid: { color: '#374151' },
                    pointLabels: { color: '#d1d5db', font: { size: isModal ? 14 : 10 } },
                    ticks: { color: 'white', backdropColor: 'transparent' }
                }
            }
        }
    });
}
