// charts/vegalite-chart.js
export function renderVegaLiteChart(containerId, isModal = false) {
    const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": isModal ? "Relación Caballos de Fuerza vs. Millas por Galón" : "",
        "width": "container", // Clave para el redimensionamiento
        "height": "container", // Clave para el redimensionamiento
        "data": { "url": "https://vega.github.io/vega-datasets/data/cars.json" },
        "params": [{ "name": "brush", "select": "interval" }],
        "mark": "point",
        "encoding": {
            "x": { "field": "Horsepower", "type": "quantitative" },
            "y": { "field": "Miles_per_Gallon", "type": "quantitative" },
            "color": {
                "condition": { "param": "brush", "field": "Origin", "type": "nominal" },
                "value": "grey"
            },
            "size": {
                "condition": { "param": "brush", "value": 200 },
                "value": 50
            }
        },
        "config": {
            "background": "transparent",
            "title": { "color": "white", "fontSize": 16, "anchor": "start" },
            "style": { "cell": { "stroke": "transparent" } },
            "axis": {
                "domainColor": "#4b5563", "gridColor": "#374151",
                "labelColor": "#d1d5db", "titleColor": "#d1d5db"
            },
            "legend": { "labelColor": "#d1d5db", "titleColor": "#d1d5db" }
        }
    };
    vegaEmbed("#" + containerId, spec, { actions: isModal });
}
