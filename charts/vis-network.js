// charts/vis-network.js
export function renderVisNetwork(containerId, isModal = false) {
    const nodes = new vis.DataSet([
        {id: 1, label: 'Servidor DB', group: 'db'},
        {id: 2, label: 'API Gateway', group: 'api'},
        {id: 3, label: 'App Móvil', group: 'client'},
        {id: 4, label: 'Web App', group: 'client'},
        {id: 5, label: 'Servicio Auth', group: 'service'},
        {id: 6, label: 'Servicio Pagos', group: 'service'},
    ]);
    const edges = new vis.DataSet([
        {from: 2, to: 1}, {from: 2, to: 5}, {from: 2, to: 6},
        {from: 3, to: 2}, {from: 4, to: 2}, {from: 5, to: 1}
    ]);
    const container = document.getElementById(containerId);
    const data = { nodes: nodes, edges: edges };
    const options = {
        nodes: {
            shape: 'dot', size: isModal ? 20 : 16,
            font: { color: '#fff', size: 14 },
            borderWidth: 2
        },
        edges: { width: 2, color: { inherit: 'from' } },
        groups: {
            db: { color: { background: '#ef4444', border: '#f87171' }, shape: 'database' },
            api: { color: { background: '#3b82f6', border: '#60a5fa' } },
            client: { color: { background: '#22c55e', border: '#4ade80' } },
            service: { color: { background: '#f97316', border: '#fb923c' } }
        },
        physics: { enabled: true },
        interaction: { hover: true }
    };
    new vis.Network(container, data, options);
}
