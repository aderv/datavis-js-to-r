// charts/echarts-chart.js
export function renderEChartsChart(containerId, isModal = false) {
    const chartDom = document.getElementById(containerId);
    // Asegurarnos de que no haya una instancia previa
    let myChart = echarts.getInstanceByDom(chartDom);
    if (myChart) {
        myChart.dispose();
    }
    myChart = echarts.init(chartDom, 'dark');
    
    const nodes = Array.from({length: 15}, (_, i) => ({
        id: i, name: `Nodo ${i}`,
        symbolSize: Math.random() * (isModal ? 40 : 20) + 10,
        value: Math.round(Math.random() * 100), category: Math.floor(i / 5)
    }));
    const links = Array.from({length: 20}, () => ({
        source: Math.floor(Math.random() * 15),
        target: Math.floor(Math.random() * 15)
    }));
    const option = {
        // *** SOLUCIÓN 1: Fondo transparente ***
        backgroundColor: 'transparent',
        title: { text: isModal ? 'Gráfico de Red (ECharts)' : '', left: 'center', textStyle: { color: '#e5e7eb' } },
        tooltip: {},
        legend: [{ data: ['Cat 0', 'Cat 1', 'Cat 2'], textStyle: { color: '#9ca3af' } }],
        series: [{
            type: 'graph', layout: 'force',
            categories: [{ name: 'Cat 0' }, { name: 'Cat 1' }, { name: 'Cat 2' }],
            roam: true, label: { show: isModal, position: 'right', formatter: '{b}' },
            lineStyle: { color: 'source', curveness: 0.3 },
            force: { repulsion: isModal ? 120 : 60 },
            data: nodes, links: links
        }]
    };
    myChart.setOption(option);
    new ResizeObserver(() => myChart.resize()).observe(chartDom);

    // *** SOLUCIÓN 2: Devolver la instancia para poder destruirla ***
    return myChart;
}
