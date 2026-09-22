const navItems = document.querySelectorAll(".nav-item");
const main = document.querySelector(".main");


// ========================================
// NAVEGACIÓN PRINCIPAL
// ========================================

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        const view = item.dataset.view;

        activarMenu(item);
        cambiarVista(view);

    });

});


function activarMenu(itemActivo) {

    navItems.forEach((item) => {
        item.classList.remove("active");
    });

    itemActivo.classList.add("active");
}


function cambiarVista(view) {

    switch (view) {

        case "dashboard":
            mostrarDashboard();
            break;

        case "simulator":
            mostrarSimulador();
            break;

        case "consumption":
            mostrarConsumo();
            break;

        case "scenarios":
            mostrarEscenarios();
            break;

        case "system":
            mostrarSistema();
            break;

    }
}


// ========================================
// DASHBOARD
// ========================================

function mostrarDashboard() {

    main.innerHTML = `

        <header class="topbar">

            <div>
                <p class="eyebrow">CENTRO DE CONTROL</p>
                <h2>Dashboard energético</h2>
            </div>

            <div class="system-status">
                <span class="status-dot"></span>
                Sistema conectado
            </div>

        </header>


        <section class="hero">

            <div>

                <p class="eyebrow">HELIOS ENGINE</p>

                <h3>
                    Energía solar,<br>
                    <span>convertida en información.</span>
                </h3>

                <p class="hero-text">
                    Visualiza, analiza y simula el comportamiento
                    energético de una instalación fotovoltaica.
                </p>

                <button class="primary-button" id="open-simulator">
                    Abrir simulador →
                </button>

            </div>


            <div class="solar-visual">

                <div class="sun">
                    ☀
                </div>

                <div class="energy-ring ring-one"></div>
                <div class="energy-ring ring-two"></div>

            </div>

        </section>


        <section class="metrics">

            <div class="metric-card">
                <span>Generación hoy</span>
                <strong>— kWh</strong>
                <small>Esperando datos</small>
            </div>

            <div class="metric-card">
                <span>Consumo</span>
                <strong>— kWh</strong>
                <small>Sin datos registrados</small>
            </div>

            <div class="metric-card">
                <span>Cobertura solar</span>
                <strong>— %</strong>
                <small>Calculada por HELIOS</small>
            </div>

            <div class="metric-card">
                <span>Potencia instalada</span>
                <strong>— kWp</strong>
                <small>Configuración pendiente</small>
            </div>

        </section>


        <section class="dashboard-grid">

            <div class="panel chart-panel">

                <div class="panel-header">

                    <div>
                        <p class="eyebrow">ANÁLISIS ENERGÉTICO</p>
                        <h4>Generación vs consumo</h4>
                    </div>

                    <span class="panel-tag">
                        PROYECCIÓN
                    </span>

                </div>

                <div class="chart-placeholder">

                    <div class="chart-line"></div>

                    <div class="chart-labels">
                        <span>Ene</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Abr</span>
                        <span>May</span>
                        <span>Jun</span>
                    </div>

                    <p>
                        El gráfico aparecerá cuando HELIOS reciba datos.
                    </p>

                </div>

            </div>


            <div class="panel system-panel">

                <div class="panel-header">

                    <div>
                        <p class="eyebrow">CONFIGURACIÓN</p>
                        <h4>Sistema fotovoltaico</h4>
                    </div>

                </div>


                <div class="system-data">

                    <div>
                        <span>Paneles</span>
                        <strong>—</strong>
                    </div>

                    <div>
                        <span>Potencia por panel</span>
                        <strong>— W</strong>
                    </div>

                    <div>
                        <span>Inversor</span>
                        <strong>—</strong>
                    </div>

                    <div>
                        <span>Orientación</span>
                        <strong>—</strong>
                    </div>

                </div>

            </div>

        </section>


        <footer>
            HELIOS · Plataforma de análisis fotovoltaico · v0.1
        </footer>

    `;


    document
        .querySelector("#open-simulator")
        .addEventListener("click", () => {

            const simulatorButton =
                document.querySelector('[data-view="simulator"]');

            activarMenu(simulatorButton);
            mostrarSimulador();

        });
}


// ========================================
// SIMULADOR
// ========================================

function mostrarSimulador() {

    main.innerHTML = `

        <header class="topbar">

            <div>
                <p class="eyebrow">HELIOS ENGINE</p>
                <h2>Simulador fotovoltaico</h2>
            </div>

            <div class="system-status">
                <span class="status-dot"></span>
                Motor activo
            </div>

        </header>


        <section class="hero">

            <div>

                <p class="eyebrow">
                    CONFIGURACIÓN DEL SISTEMA
                </p>

                <h3>
                    Diseña tu instalación.
                </h3>

                <p class="hero-text">
                    Introduce los parámetros básicos del sistema
                    fotovoltaico para analizar su capacidad.
                </p>

            </div>

        </section>


        <section class="metrics">

            <div class="metric-card">

                <span>Número de paneles</span>

                <input
                    id="panel-count"
                    type="number"
                    value="120"
                    min="1"
                >

            </div>


            <div class="metric-card">

                <span>Potencia por panel</span>

                <input
                    id="panel-power"
                    type="number"
                    value="550"
                    min="1"
                >

                <small>Watts</small>

            </div>


            <div class="metric-card">

                <span>Inclinación</span>

                <input
                    id="panel-angle"
                    type="number"
                    value="20"
                    min="0"
                    max="90"
                >

                <small>Grados</small>

            </div>


            <div class="metric-card">

                <span>Pérdidas estimadas</span>

                <input
                    id="system-losses"
                    type="number"
                    value="14"
                    min="0"
                    max="100"
                >

                <small>Porcentaje</small>

            </div>

        </section>


        <section class="dashboard-grid">

            <div class="panel">

                <div class="panel-header">

                    <div>
                        <p class="eyebrow">RESULTADO</p>
                        <h4>Capacidad instalada</h4>
                    </div>

                </div>


                <div class="metric-card">

                    <span>Potencia fotovoltaica</span>

                    <strong id="installed-power">
                        66.00 kWp
                    </strong>

                    <small>
                        Potencia nominal del arreglo
                    </small>

                </div>


                <button
                    class="primary-button"
                    id="simulate-system"
                >
                    SIMULAR SISTEMA →
                </button>

            </div>


            <div class="panel">

                <div class="panel-header">

                    <div>
                        <p class="eyebrow">HELIOS</p>
                        <h4>Estado del modelo</h4>
                    </div>

                </div>


                <div class="system-data">

                    <div>
                        <span>Motor solar</span>
                        <strong>ACTIVO</strong>
                    </div>

                    <div>
                        <span>Modelo energético</span>
                        <strong>v0.1</strong>
                    </div>

                    <div>
                        <span>Datos reales</span>
                        <strong>PENDIENTES</strong>
                    </div>

                </div>

            </div>

        </section>


        <footer>
            HELIOS · Simulador fotovoltaico · v0.1
        </footer>

    `;


    document
        .querySelector("#simulate-system")
        .addEventListener("click", calcularSistema);


    document
        .querySelector("#panel-count")
        .addEventListener("input", calcularSistema);


    document
        .querySelector("#panel-power")
        .addEventListener("input", calcularSistema);
}


// ========================================
// CÁLCULO INICIAL
// ========================================

function calcularSistema() {

    const paneles =
        Number(document.querySelector("#panel-count").value);

    const potenciaPanel =
        Number(document.querySelector("#panel-power").value);


    const potenciaTotal =
        (paneles * potenciaPanel) / 1000;


    document.querySelector("#installed-power").textContent =
        `${potenciaTotal.toFixed(2)} kWp`;
}


// ========================================
// CONSUMO
// ========================================

function mostrarConsumo() {

    mostrarModuloBase(
        "Consumo energético",
        "Analiza el consumo eléctrico de la escuela."
    );

}


// ========================================
// ESCENARIOS
// ========================================

function mostrarEscenarios() {

    mostrarModuloBase(
        "Escenarios",
        "Compara diferentes configuraciones fotovoltaicas."
    );

}


// ========================================
// SISTEMA
// ========================================

function mostrarSistema() {

    mostrarModuloBase(
        "Sistema fotovoltaico",
        "Configura los componentes de la instalación."
    );

}


// ========================================
// MÓDULO TEMPORAL
// ========================================

function mostrarModuloBase(titulo, descripcion) {

    main.innerHTML = `

        <header class="topbar">

            <div>

                <p class="eyebrow">
                    HELIOS ENGINE
                </p>

                <h2>${titulo}</h2>

            </div>


            <div class="system-status">

                <span class="status-dot"></span>

                Módulo disponible

            </div>

        </header>


        <section class="hero">

            <div>

                <p class="eyebrow">
                    MÓDULO HELIOS
                </p>

                <h3>
                    ${titulo}<br>
                    <span>en desarrollo.</span>
                </h3>

                <p class="hero-text">
                    ${descripcion}
                </p>

            </div>

        </section>


        <footer>
            HELIOS · ${titulo} · v0.1
        </footer>

    `;

}