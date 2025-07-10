// Importar las funciones que renderizan cada gráfico desde sus respectivos archivos
import { renderPlotlyChart } from './charts/plotly-chart.js';
import { renderEChartsChart } from './charts/echarts-chart.js';
import { renderDygraphChart } from './charts/dygraphs-chart.js';
import { renderLeafletMap } from './charts/leaflet-map.js';
import { renderD3Chart } from './charts/d3-chart.js';
import { renderApexChart } from './charts/apex-chart.js';
import { renderVisNetwork } from './charts/vis-network.js';
import { renderBillboardChart } from './charts/billboard-chart.js';
import { renderVegaLiteChart } from './charts/vegalite-chart.js';
import { renderChartJS } from './charts/chartjs-chart.js';

// Datos de las librerías con su función de renderizado asociada
const libraries = [
    { id: 'plotly', icon: '🥇', js: 'Plotly.js', r: 'plotly', license: 'MIT', analysis: '<strong>Excepcional.</strong> Es el estándar de oro para gráficos interactivos en R. Ofrece control total sobre cada aspecto: colores, leyendas, ejes, animaciones y más. Su función <code>ggplotly()</code> permite convertir un gráfico estático de <code>ggplot2</code> a un objeto <code>plotly</code> de forma directa.', renderFunc: renderPlotlyChart },
    { id: 'echarts', icon: '🚀', js: 'Apache ECharts', r: 'echarts4r', license: 'Apache 2.0', analysis: '<strong>Excepcional.</strong> Increíblemente potente y versátil, ideal para dashboards llamativos. Permite crear visualizaciones muy complejas con animaciones fluidas, efectos de sombras y una personalización granular.', renderFunc: renderEChartsChart },
    { id: 'dygraphs', icon: '📈', js: 'Dygraphs', r: 'dygraphs', license: 'MIT', analysis: '<strong>Muy Alto.</strong> El especialista para series de tiempo. Su rendimiento con millones de puntos es bastante alto y su interactividad (zoom/paneo) es muy fluida.', renderFunc: renderDygraphChart },
    { id: 'leaflet', icon: '🗺️', js: 'Leaflet', r: 'leaflet', license: 'BSD-2-Clause', analysis: '<strong>Excepcional (para Mapas).</strong> Es la librería por defecto para mapas interactivos. Permite capas, marcadores personalizados, polígonos, y tiene una integración perfecta con Shiny.', renderFunc: renderLeafletMap },
    { id: 'd3', icon: '🎨', js: 'D3.js', r: 'r2d3 / d3r', license: 'BSD-3-Clause', analysis: '<strong>Total.</strong> Más que una librería, es una "gramática de visualización" que ofrece un poder de personalización ilimitado. La curva de aprendizaje es alta, pero con <code>r2d3</code> se puede integrar cualquier visualización D3 en Shiny.', renderFunc: renderD3Chart },
    { id: 'apexcharts', icon: '✨', js: 'ApexCharts.js', r: 'apexcharter', license: 'MIT', analysis: '<strong>Muy Alto.</strong> Ofrece gráficos SVG modernos, limpios y muy elegantes con excelentes animaciones. Es una fantástica alternativa a Plotly para dashboards con una estética muy cuidada.', renderFunc: renderApexChart },
    { id: 'visjs', icon: '🕸️', js: 'vis.js', r: 'visNetwork', license: 'MIT / Apache 2.0', analysis: '<strong>Excepcional (para Redes).</strong> La mejor opción para visualizar grafos y redes interactivas. Permite simular físicas, manipular nodos y personalizar completamente la apariencia de la red.', renderFunc: renderVisNetwork },
    { id: 'billboard', icon: '📊', js: 'Billboard.js', r: 'billboarder', license: 'MIT', analysis: '<strong>Alto.</strong> Es un fork moderno y mantenido de la popular C3.js. Ofrece una API muy sencilla para crear gráficos elegantes basados en D3, con excelente personalización.', renderFunc: renderBillboardChart },
    { id: 'vegalite', icon: '⚙️', js: 'Vegalite', r: 'vegawidget', license: 'BSD-3-Clause', analysis: '<strong>Muy Alto.</strong> Es una "gramática de gráficos interactivos", similar en filosofía a <code>ggplot2</code>. Permite construir visualizaciones complejas a partir de reglas sencillas.', renderFunc: renderVegaLiteChart },
    { id: 'chartjs', icon: '🧼', js: 'Chart.js', r: 'chartjs', license: 'MIT', analysis: '<strong>Alto.</strong> Famosa por su simplicidad y diseños limpios. Es muy fácil de usar y personalizar. Una opción muy efectiva para gráficos sencillos y atractivos sin complicaciones.', renderFunc: renderChartJS },
];

document.addEventListener('DOMContentLoaded', function() {
    const tbody = document.getElementById('chart-table-body');
    
    // Generar las filas de la tabla
    libraries.forEach((lib) => {
        const chartContainerId = `${lib.id}-chart`;
        const row = `
            <tr class="hover:bg-gray-700/50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap text-2xl" title="${lib.js}">${lib.icon}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">${lib.js}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300"><code>${lib.r}</code></td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${lib.license}</td>
                <td class="px-6 py-4 text-sm text-gray-300 analysis-cell">${lib.analysis}</td>
                <td class="px-6 py-4 text-sm text-gray-300 example-cell">
                    <div id="${chartContainerId}" class="chart-container" data-library-id="${lib.id}"></div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    // Renderizar todos los gráficos en la tabla
    libraries.forEach(lib => {
        if (lib.renderFunc) {
            lib.renderFunc(`${lib.id}-chart`);
        }
    });

    // Funcionalidad del Modal
    const modal = document.getElementById('chartModal');
    const modalChartContainer = document.getElementById('modal-chart-container');
    const closeModalBtn = document.getElementById('closeModal');
    let activeChartInstance = null;

    document.querySelectorAll('.chart-container').forEach(container => {
        container.addEventListener('click', function() {
            // *** SOLUCIÓN 2: Destruir la instancia ANTES de abrir una nueva ***
            if (activeChartInstance) {
                if (typeof activeChartInstance.destroy === 'function') {
                    activeChartInstance.destroy();
                } else if (typeof activeChartInstance.dispose === 'function') { // ECharts usa dispose()
                    activeChartInstance.dispose();
                }
            }
            modalChartContainer.innerHTML = '';

            const libraryId = this.dataset.libraryId;
            const library = libraries.find(l => l.id === libraryId);
            
            if (library) {
                modal.classList.remove('hidden');
                requestAnimationFrame(() => {
                    activeChartInstance = library.renderFunc(modalChartContainer.id, true);
                });
            }
        });
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        if (activeChartInstance) {
             if (typeof activeChartInstance.destroy === 'function') {
                activeChartInstance.destroy();
            } else if (typeof activeChartInstance.dispose === 'function') {
                activeChartInstance.dispose();
            }
        }
        modalChartContainer.innerHTML = '';
        activeChartInstance = null;
    };

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});
