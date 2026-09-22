// ========================================
// HELIOS ENGINE
// MODELO SOLAR
// ========================================

function calcularSistema(paneles, potenciaPanel, perdidas) {

    // Potencia instalada en kWp
    const potenciaInstalada =
        (paneles * potenciaPanel) / 1000;


    // Potencia disponible después de pérdidas
    const factorPerdidas =
        1 - (perdidas / 100);

    const potenciaUtil =
        potenciaInstalada * factorPerdidas;


    return {
        potenciaInstalada,
        potenciaUtil
    };
}


// Exportamos el modelo
export {
    calcularSistema
};