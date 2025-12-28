document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el degradado en el contenedor de previsualización
    const gradient = new LinearGradient('gradient-preview');
    let isDragging = false;
    let currentStop = null;

    // Referencias a elementos del DOM
    const angleRange = document.getElementById('angle-range');
    const angleInput = document.getElementById('angle-input');
    const angleOutput = document.getElementById('angle-output');
    const autoStopsCount = document.getElementById('auto-stops-count');
    const addAutoStopsBtn = document.getElementById('add-auto-stops-btn');
    const addStopBtn = document.getElementById('add-stop-btn');
    const stopsList = document.getElementById('stops-list');
    const angleDisplay = document.getElementById('angle-display');
    const cssDisplay = document.getElementById('css-display').querySelector('textarea');
    const stripesCheckbox = document.getElementById('stripes');
    const greyscaleCheckbox = document.getElementById('greyscale');

    // Inicializar con algunas paradas por defecto
    gradient.addStop('#ffb3b3', '0%').addStop('#f0ffb3', '25%').addStop('#99ff99', '50%').addStop('#99ccff', '75%').addStop('#cc99ff', '100%');
    // linear-gradient(to bottom, #ffb3b3ff 0%, #f0ffb3ff 25%, hsl(144, 100%, 85%) 50%, hsl(216, 100%, 85%) 75%, hsl(288, 100%, 85%) 100%)

    // Renderizar la lista de paradas en la UI
    function renderStopsList() {
        stopsList.innerHTML = '';

        gradient.stops.forEach((stop, index) => {
            const hexColor = new xcolor(stop.color).getHexString();

            const stopItem = document.createElement('div');
            stopItem.className = 'stop-item';

            const colorPreview = document.createElement('input');
            colorPreview.type = 'color';
            colorPreview.value = hexColor;
            colorPreview.className = 'stop-color';            
            colorPreview.addEventListener('change', (e) => {
                gradient.stops[index].color = e.target.value;
                gradient.render();
                renderStopsList();
            });

            const colorInput = document.createElement('input');
            colorInput.type = 'text';
            colorInput.value = hexColor;
            colorInput.readOnly = true;
            colorInput.style.width = '70px';
            colorInput.style.marginRight = '10px';

            const positionInput = document.createElement('input');
            positionInput.type = 'text';
            positionInput.value = stop.position;
            positionInput.style.width = '50px';
            positionInput.addEventListener('change', (e) => {
                gradient.stops[index].position = e.target.value;
                gradient.sortStops();
                gradient.render();
                renderStopsList();
            });

            const positionRage = document.createElement('input');
            positionRage.type = 'range';
            positionRage.min = 0;
            positionRage.max = 100;
            positionRage.step = 1;
            positionRage.value = parseInt(stop.position);
            positionRage.style.margin = '0 10px';
            positionRage.style.width = '100%';
            positionRage.addEventListener('input', (e) => {
                const val = e.target.value;
                e.target.previousElementSibling.value = `${val}%`;
            });
            positionRage.addEventListener('change', (e) => {
                const val = e.target.value;
                gradient.stops[index].position = `${val}%`;
                gradient.sortStops();
                gradient.render();
                renderStopsList();
            });

            const duplicateBtn = document.createElement('button');
            duplicateBtn.className = 'duplicate-btn';
            duplicateBtn.textContent = '⧉';
            duplicateBtn.addEventListener('click', () => {
                gradient.stops.splice(index, 0, {color: gradient.stops[index].color, position: gradient.stops[index].position});
                gradient.render();
                renderStopsList();
            });

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.textContent = '×';
            removeBtn.addEventListener('click', () => {
                gradient.removeStop(index);
                renderStopsList();
            });

            stopItem.appendChild(colorPreview);
            stopItem.appendChild(colorInput);
            stopItem.appendChild(positionInput);
            stopItem.appendChild(positionRage);
            stopItem.appendChild(duplicateBtn);
            stopItem.appendChild(removeBtn);

            stopsList.appendChild(stopItem);
        });
    }

    // Abrir selector de color para una parada específica
    /*function openColorPicker(e, index) {
        const color = new xcolor(gradient.stops[index].color).getHexString();
        let input = document.getElementById('color-picker-input');
        if (!input) {
            input = document.createElement('input');
            input.id = 'color-picker-input';
            input.type = 'color';
            input.value = color;
            input.style.visibility = 'hidden';
            input.style.position = 'absolute';
             input.addEventListener('input', (e) => {
                gradient.stops[index].color = e.target.value;
                gradient.render();
                renderStopsList();
            });
            document.body.appendChild(input);
        }else {
            input.value = color;
            input.style.left = e.clientX + 'px';
            input.style.top = e.clientY + 'px';
        }
        input.click();
    }*/

    // Configurar eventos para los controles
    stripesCheckbox.addEventListener('change', () => {
        if (stripesCheckbox.checked) {
            let gradientStops = gradient.stops;
            let stripedStops = [];
            gradientStops.forEach((stop, index) => {
                if (index < gradientStops.length - 1) {
                    // Añadir una parada intermedia para crear la franja
                    const nextStop = gradientStops[index + 1];
                    const stripeStop = {color: nextStop.color, position: nextStop.position};
                    stripeStop.position = stop.position;
                    stripedStops.push(stop);
                    stripedStops.push(stripeStop);
                }else {
                    stripedStops.push(stop);
                }
            });
            gradient.stops = stripedStops;
            gradient.render();
            renderStopsList();
            cssDisplay.value = gradient.getCSS();
        }
    });

    greyscaleCheckbox.addEventListener('change', () => {
        if (greyscaleCheckbox.checked) {
            gradient.stops.forEach((stop, index) => {
                const grey = new xcolor(stop.color).toGreyscale().getHexString();
                gradient.stops[index].color = grey;
            });
            gradient.render();
            renderStopsList();
            cssDisplay.value = gradient.getCSS();
        }
    });


    angleRange.addEventListener('input', () => {
        angleInput.value = `${angleRange.value}deg`;
        angleOutput.value =  angleInput.value;
        gradient.setAngle(angleInput.value);
        cssDisplay.value = gradient.getCSS();
    });

    addAutoStopsBtn.addEventListener('click', () => {
        const count = parseInt(autoStopsCount.value);
        if (count < 1) return;

        // Eliminar paradas existentes
        gradient.stops = [];

        // Calcular posiciones equidistantes
        const step = 100 / (count - 1);

        for (let i = 0; i < count; i++) {
            const position = `${i * step}%`;
            // Generar color aleatorio pero similar para visualización
            const hue = Math.floor(i * (360 / count));
            gradient.addStop(`hsl(${hue}, 100%, 85%)`, position);
        }

        cssDisplay.value = gradient.getCSS();

        renderStopsList();
    });

    addStopBtn.addEventListener('click', () => {
        // Agregar una parada en el centro si no hay paradas
        const position = gradient.stops.length === 0 ? '50%' : '75%';
        gradient.addStop('#888888', position);
        renderStopsList();
    });

    // Configurar arrastre de paradas en la previsualización
    const previewContainer = document.getElementById('gradient-preview');
    let startX, startY;

    function handleMouseDown(e) {
        if (e.target.classList.contains('stop-handler')) {
            isDragging = true;
            currentStop = e.target.dataset.stopIndex;
            startX = e.clientX;
            startY = e.clientY;
            previewContainer.style.cursor = 'grabbing';
        }
    }

    function handleMouseMove(e) {
        if (!isDragging || currentStop === null) return;

        const rect = previewContainer.getBoundingClientRect();
        const x = e.clientX - startX;
        const y = e.clientY - startY; 

        // Calcular porcentaje (0-100) basado en la posición del mouse
        let percentage = Math.round((y / 250) * 100);
        percentage = Math.max(0, Math.min(100, percentage)); // Limitar entre 0 y 100

        gradient.stops[currentStop].position = `${percentage}%`;
        gradient.sortStops();
        gradient.render();

        // Actualizar la posición del handler visual
        const handlers = previewContainer.querySelectorAll('.stop-handler');
        handlers.forEach((handler, index) => {
            if (index === parseInt(currentStop)) {
                handler.style.top = (((250-22)*percentage)/100) +"px";//`${percentage}%`;
            }
        });
        const labels = previewContainer.querySelectorAll('.stop-label');
        labels.forEach((label, index) => {
            if (index === parseInt(currentStop)) {
                label.style.top = `${percentage - 15}%`;
            }
        });

        renderStopsList();
    }

    function handleMouseUp() {
        isDragging = false;
        currentStop = null;
        previewContainer.style.cursor = 'default';
    }

    // Configurar eventos de mouse
    previewContainer.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Inicializar la UI
    //updateAngleDisplay();
    renderStopsList();

    // Actualizar los handlers visuales cuando se modifica el degradado
    function updateVisualHandlers() {
        const handlers = previewContainer.querySelectorAll('.stop-handler');
        handlers.forEach(h => h.remove());

        gradient.stops.forEach((stop, index) => {
            const handler = document.createElement('div');
            handler.className = 'stop-handler';
            handler.dataset.stopIndex = index;

            // Posicionar el handler según la posición de la parada
            const percentage = parseFloat(stop.position);
            handler.style.top = (((250-22)*percentage)/100) +"px";//`${percentage}%`;
            handler.style.left = '50%';

            previewContainer.appendChild(handler);

            // Etiqueta con la posición
            const label = document.createElement('div');
            label.className = 'stop-label';
            label.textContent = stop.position;
            label.style.top = `${percentage - 15}%`;
            label.style.left = '50%';
            previewContainer.appendChild(label);
        });
    }

    // Actualizar los handlers visuales inicialmente
    //updateVisualHandlers();
});