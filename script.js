document.addEventListener('DOMContentLoaded', function() {

    // === 1. MENSAJE DE BIENVENIDA ===
    const alertaBienvenida = document.getElementById('alertaBienvenida');
    if (alertaBienvenida) {
        alertaBienvenida.innerHTML = `
            <div class="alert alert-info alert-dismissible fade show border-0 shadow-sm" role="alert">
                <strong>¡Bienvenido a mi portafolio!</strong> Explora mis habilidades y desarrollos de software.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        setTimeout(() => {
            const alertElement = bootstrap.Alert.getOrCreateInstance(alertaBienvenida.querySelector('.alert'));
            if (alertElement) alertElement.close();
        }, 5000);
    }

    // === 2. FECHA Y HORA ACTUAL EN TIEMPO REAL ===
    function actualizarFechaHora() {
        const elementoFechaHora = document.getElementById('fecha-hora-actual');
        if (elementoFechaHora) {
            const ahora = new Date();
            const opciones = { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                hour: '2-digit', minute: '2-digit', second: '2-digit' 
            };
            elementoFechaHora.innerHTML = `<i class="bi bi-clock-fill text-info me-1"></i> ${ahora.toLocaleDateString('es-ES', opciones)}`;
        }
    }
    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000);

    // === 3. CAMBIAR EL TEMA CLARO/OSCURO ===
    const btnTema = document.getElementById('btnTema');
    if (btnTema) {
        btnTema.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                btnTema.innerHTML = `<i class="bi bi-sun-fill"></i> Modo Claro`;
                btnTema.classList.replace('btn-outline-info', 'btn-info');
                btnTema.classList.add('text-dark');
            } else {
                btnTema.innerHTML = `<i class="bi bi-moon-fill"></i> Modo Oscuro`;
                btnTema.classList.replace('btn-info', 'btn-outline-info');
                btnTema.classList.remove('text-dark');
            }
        });
    }

    // === 4. DESPLEGAR PROYECTOS DINÁMICAMENTE CON ENLACES REALES ===
    const usuarioGitHub = "dianafernandezz"; 

    const proyectos = [
        {
            titulo: "Control de Gastos (SpendControl)",
            descripcion: "Aplicación desarrollada con HTML, CSS, Bootstrap y JavaScript. Permite gestionar finanzas mediante un formulario interactivo y un panel con el Historial de Movimientos detallado por descripción, categoría y tipo.",
            imagen: "gasto.jpg",
            urlDemo: `https://${usuarioGitHub}.github.io/control-gasto/`,
            urlCodigo: `https://github.com/${usuarioGitHub}/control-gasto`
        },
        {
            titulo: "Calculadora Básica",
            descripcion: "Herramienta matemática interactiva construida con Bootstrap 5 y lógica pura en JavaScript. Permite procesar operaciones aritméticas esenciales (Suma, Resta, Multiplicación, División) incluyendo validaciones contra campos vacíos y divisiones por cero.",
            imagen: "calculadora.jpg",
            urlDemo: `https://${usuarioGitHub}.github.io/calculadora-basica/`,
            urlCodigo: `https://github.com/${usuarioGitHub}/calculadora-basica`
        },
        {
            titulo: "SweetBook (Recetario)",
            descripcion: "Catálogo interactivo con motor de búsqueda en tiempo real por ingredientes y nombres. Estructura de forma dinámica las instrucciones de preparación utilizando acordeones colapsables nativos de Bootstrap.",
            imagen: "recetario.jpg",
            urlDemo: `https://${usuarioGitHub}.github.io/recetario/`,
            urlCodigo: `https://github.com/${usuarioGitHub}/recetario`
        }
    ];

    const contenedorProyectos = document.getElementById('contenedor-proyectos');
    if (contenedorProyectos) {
        contenedorProyectos.innerHTML = ''; 
        proyectos.forEach(proyecto => {
            const tarjetaHTML = `
                <div class="col-md-4">
                    <div class="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                        <img src="${proyecto.imagen}" class="card-img-top border-bottom bg-light" alt="Vista de ${proyecto.titulo}" style="height: 220px; object-fit: contain; padding: 10px;">
                        <div class="card-body d-flex flex-column p-4">
                            <h5 class="fw-bold card-title mb-1" style="font-size: 1.15rem;">${proyecto.titulo}</h5>
                            <p class="text-muted mb-3" style="font-size: 0.88rem; line-height: 1.5;">${proyecto.descripcion}</p>
                            <div class="mt-auto d-flex gap-2">
                                <!-- Enlace dinámico a la demo en GitHub Pages -->
                                <a href="${proyecto.urlDemo}" target="_blank" class="btn btn-primary flex-grow-1 fw-bold btn-sm py-2">Ver demo</a>
                                <!-- Enlace dinámico al repositorio de código en GitHub -->
                                <a href="${proyecto.urlCodigo}" target="_blank" class="btn btn-secondary fw-bold btn-sm px-3" style="background-color: #6c757d; border-color: #6c757d;" title="Ver código fuente">
                                    <i class="bi bi-code-slash"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            contenedorProyectos.innerHTML += tarjetaHTML;
        });
    }

    // === 5. VALIDAR EL FORMULARIO DE CONTACTO ===
    const formContacto = document.getElementById('formContacto');
    const mensajeFeedback = document.getElementById('mensajeFeedback');

    if (formContacto && mensajeFeedback) {
        formContacto.addEventListener('submit', function(event) {
            event.preventDefault();

            const nombre = document.getElementById('txtContactoNombre').value.trim();
            const email = document.getElementById('txtContactoEmail').value.trim();
            const mensaje = document.getElementById('txtContactoMensaje').value.trim();

            mensajeFeedback.innerHTML = '';

            if (nombre === '' || email === '' || mensaje === '') {
                mensajeFeedback.innerHTML = `
                    <div class="alert alert-danger border-0 small py-2">
                        <i class="bi bi-exclamation-triangle-fill me-1"></i> Por favor, completa todos los campos del formulario.
                    </div>`;
                return;
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                mensajeFeedback.innerHTML = `
                    <div class="alert alert-danger border-0 small py-2">
                        <i class="bi bi-envelope-exclamation-fill me-1"></i> El formato del correo electrónico no es válido.
                    </div>`;
                return;
            }

            mensajeFeedback.innerHTML = `
                <div class="alert alert-success border-0 small py-2">
                    <i class="bi bi-check-circle-fill me-1"></i> ¡Mensaje validado correctamente! Procesando envío...
                </div>`;

            formContacto.reset();
        });
    }
});