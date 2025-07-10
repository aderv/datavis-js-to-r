// charts/d3-chart.js
export function renderD3Chart(containerId, isModal = false) {
    const container = d3.select("#" + containerId);
    container.html(""); // Limpiar contenido previo
    
    // Esperar a que el contenedor tenga dimensiones
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;

    if (width === 0 || height === 0) return; // No renderizar si no hay espacio

    const svg = container.append("svg").attr("width", width).attr("height", height);
    
    // ... (resto del código de D3 igual que antes)
    const numNodes = isModal ? 40 : 25;
    const nodes = Array.from({length: numNodes}, (_, i) => ({ id: i, group: Math.floor(i/8) }));
    
    const simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(isModal ? -40 : -30))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(d => (d.group + 1) * 4 + 2));

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", d => (d.group + 1) * 4)
        .attr("fill", d => color(d.group))
        .attr("stroke", "#1f2937")
        .attr("stroke-width", 1.5)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title").text(d => `Nodo ${d.id}\nGrupo ${d.group}`);

    simulation.on("tick", () => {
        node.attr("cx", d => d.x).attr("cy", d => d.y);
    });

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
}
