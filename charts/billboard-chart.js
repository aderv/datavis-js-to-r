// charts/billboard-chart.js
export function renderBillboardChart(containerId, isModal = false) {
    const chart = bb.generate({
        bindto: "#" + containerId,
        data: {
            columns: [
                ["Ventas A", 30, 200, 100, 400, 150, 250],
                ["Ventas B", 130, 100, 140, 200, 150, 50],
                ["Crecimiento", 1.2, 1.5, 1.1, 1.8, 1.3, 1.6]
            ],
            types: { "Ventas A": "bar", "Ventas B": "bar", "Crecimiento": "spline" },
            groups: [ ["Ventas A", "Ventas B"] ],
            axes: { "Crecimiento": "y2" }
        },
        axis: {
            x: { type: "category", categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"] },
            y2: { show: true, label: "Tasa" }
        },
        title: { text: isModal ? 'Ventas y Crecimiento (Billboard.js)' : '' },
        theme: "dark",
        // Forzar redimensionamiento en el modal
        onrendered: function() {
            if (isModal) {
                this.resize();
            }
        }
    });
    return chart;
}
