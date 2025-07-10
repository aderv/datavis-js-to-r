// charts/dygraphs-chart.js

export function renderDygraphChart(containerId, isModal = false) {
    // Generar datos de ejemplo directamente como un array de JavaScript
    const data = [];
    const startDate = new Date("2023-01-01");

    for (let i = 0; i < 100; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);
        
        const value = 50 + 20 * Math.sin(i / 5) + (Math.random() - 0.5) * 10;
        const error = Math.random() * 5 + 4; // Aumentamos un poco el error para que sea más visible
        
        // *** LA SOLUCIÓN DEFINITIVA ***
        // Usamos el formato que espera `customBars`: [fecha, [min, centro, max]]
        data.push([currentDate, [value - error, value, value + error]]);
    }

    // Definir las opciones del gráfico
    const options = {
        title: isModal ? 'Serie de Tiempo con Bandas de Error (Dygraphs)' : '',
        ylabel: 'Valor',
        
        // Las etiquetas ahora se definen aquí
        labels: ['Date', 'Value'],
        
        // Usar 'customBars' para un control total sobre las bandas de error
        customBars: true,
        
        // Aseguramos que la línea y los puntos sean visibles
        drawPoints: true,
        pointSize: 2,
        strokeWidth: 1.5, // Hacemos la línea un poco más gruesa

        showRangeSelector: isModal,
        rangeSelectorHeight: 40,
        rangeSelectorPlotStrokeColor: '#a78bfa',
        rangeSelectorPlotFillColor: 'rgba(167, 139, 250, 0.2)',
        
        // Definimos el color de la serie y la opacidad de la banda de error
        series: {
            'Value': {
                color: '#2dd4bf', // Color de la línea y los puntos
                fillAlpha: 0.3    // Opacidad de la banda de error
            }
        },

        gridLineColor: '#374151',
        axisLineColor: '#4b5563',
        legend: 'always'
    };
    
    // Renderizar el gráfico directamente con el array de datos
    const chart = new Dygraph(document.getElementById(containerId), data, options);

    // Devolvemos la instancia para poder destruirla si es necesario
    return chart;
}
