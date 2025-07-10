// charts/leaflet-map.js
let mapInstance = null;

export function renderLeafletMap(containerId, isModal = false) {
    const container = document.getElementById(containerId);
    
    // Si hay un mapa en el contenedor, lo eliminamos primero
    if (container && container._leaflet_id) {
        const mapToRemove = L.DomUtil.get(containerId);
        if (mapToRemove != null) {
            mapToRemove._leaflet_id = null;
        }
    }
    
    const map = L.map(containerId, {
        preferCanvas: true // Puede mejorar el rendimiento
    }).setView([4.5709, -74.2973], isModal ? 6 : 5);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    const cities = [
        {name: 'Bogotá', coords: [4.7110, -74.0721]},
        {name: 'Medellín', coords: [6.2442, -75.5812]},
        {name: 'Cali', coords: [3.4516, -76.5320]},
        {name: 'Barranquilla', coords: [10.9639, -74.7964]},
        {name: 'Cartagena', coords: [10.3910, -75.4794]}
    ];

    cities.forEach(city => {
        L.marker(city.coords).addTo(map)
            .bindPopup(`<b>${city.name}</b><br>Capital importante de Colombia.`);
    });
    
    // Forzar actualización del tamaño del mapa, especialmente en el modal
    setTimeout(() => map.invalidateSize(), 100);
    
    // Devolvemos la instancia para que pueda ser destruida
    mapInstance = map;
    return {
        destroy: () => {
            if (mapInstance) {
                mapInstance.remove();
                mapInstance = null;
            }
        }
    };
}
