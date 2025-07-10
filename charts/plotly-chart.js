// charts/plotly-chart.js
export function renderPlotlyChart(containerId, isModal = false) {
    const container = document.getElementById(containerId);
    // ... (código de datos y layout igual que antes)
    const trace1 = {
        x: Array.from({length: 50}, () => Math.random() * 10),
        y: Array.from({length: 50}, () => Math.random() * 10),
        z: Array.from({length: 50}, () => Math.random() * 10),
        mode: 'markers', type: 'scatter3d',
        marker: {
            color: '#14b8a6', size: isModal ? 8 : 5, symbol: 'circle',
            line: { color: 'rgba(31, 41, 55, 0.14)', width: 0.5 },
            opacity: 0.8
        }
    };
    const layout = {
        title: isModal ? 'Gráfico de Dispersión 3D (Plotly)' : '', autosize: true,
        paper_bgcolor: 'transparent', plot_bgcolor: 'transparent',
        font: { color: '#e5e7eb' },
        margin: { l: 0, r: 0, b: 0, t: isModal ? 40 : 0 },
        scene: {
            xaxis: { title: 'Eje X', color: '#9ca3af', backgroundcolor: "#1f2937", gridcolor: "#374151" },
            yaxis: { title: 'Eje Y', color: '#9ca3af', backgroundcolor: "#1f2937", gridcolor: "#374151" },
            zaxis: { title: 'Eje Z', color: '#9ca3af', backgroundcolor: "#1f2937", gridcolor: "#374151" },
            camera: { eye: {x: 1.25, y: 1.25, z: 1.25} }
        }
    };
    Plotly.newPlot(containerId, [trace1], layout, {responsive: true, displaylogo: false});
    
    // Si está en el modal, forzamos un redimensionamiento para que ocupe todo el espacio.
    if (isModal) {
        setTimeout(() => Plotly.Plots.resize(container), 100);
    }
}
