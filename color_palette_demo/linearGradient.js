/*
// Crear un contenedor en tu HTML:
// <div id="gradient-container" style="width: 300px; height: 200px;"></div>

// Inicializar el degradado
const gradient = new LinearGradient('gradient-container');

// Agregar paradas (encadenamiento)
gradient
  .addStop('white', '0%')
  .addStop('white', '20%')
  .addStop('#fcfcfc', '20%')
  .addStop('#efefef', '40%')
  .addStop('#eaeaea', '40%')
  .addStop('#dfdfdf', '60%')
  .addStop('#dadada', '60%')
  .addStop('#cfcfcf', '80%')
  .addStop('#c0c0c0', '100%')
  .setAngle('to bottom right');

// Obtener el CSS generado
console.log(gradient.getCSS());
*/

class LinearGradient {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container with ID ${containerId} not found`);
      return;
    }

    this.stops = [];
    this.angle = 'to bottom';
    this.render();
  }

  // Agregar una parada al degradado
  addStop(color, position = '0%') {
    const stop = { color, position };
    this.stops.push(stop);
    this.sortStops();
    this.render();
    return this; // Para encadenamiento
  }

  // Eliminar una parada por posición
  removeStop(index) {
    this.stops.splice(index, 1);
    this.render();
    return this;
  }

  // Ordenar paradas por posición numérica
  sortStops() {
    this.stops.sort((a, b) => {
      const aNum = parseFloat(a.position);
      const bNum = parseFloat(b.position);
      return aNum - bNum;
    });
  }

  // Configurar el ángulo del degradado
  setAngle(angle) {
    this.angle = angle;
    this.render();
    return this;
  }

  // Renderizar el degradado en el contenedor
  render() {
    if (!this.container) return;

    const gradientString = `linear-gradient(${this.angle}, ${this.stops.map(stop => `${stop.color} ${stop.position}`).join(', ')})`;
    this.container.style.background = gradientString;
  }

  // Método para obtener el CSS generado
  getCSS() {
    return `linear-gradient(${this.angle}, ${this.stops.map(stop => `${stop.color} ${stop.position}`).join(', ')})`;
  }
}