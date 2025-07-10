// charts/apex-chart.js
export function renderApexChart(containerId, isModal = false) {
    const options = {
        series: [{
            name: 'Ingresos', type: 'column',
            data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
        }, {
            name: 'Tasa de Crecimiento', type: 'line',
            data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }],
        chart: {
            height: '100%', type: 'line',
            background: 'transparent',
            toolbar: { show: isModal }
        },
        theme: { mode: 'dark' },
        stroke: { width: [0, 4] },
        title: { text: isModal ? 'Análisis de Ingresos (ApexCharts)' : '', align: 'left' },
        dataLabels: { enabled: false },
        xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] },
        yaxis: [{
            title: { text: 'Ingresos (Miles)' },
        }, {
            opposite: true,
            title: { text: 'Tasa de Crecimiento (%)' }
        }]
    };
    const chart = new ApexCharts(document.getElementById(containerId), options);
    chart.render();
    // Retornamos la instancia para poder destruirla
    return chart;
}
