// ============================================
// SCRIPT PARA OCULTAR ELEMENTOS DEL SIDEBAR
// ============================================
(function () {
  'use strict';
  
  // Función para ocultar elementos no deseados
  function limpiarSidebar() {
    let cambiosRealizados = false;
    
    // 1. Ocultar solo "Sense assistència"
    const itemsAOcultar = [
      'li[name="Unattended"]'
    ];
    itemsAOcultar.forEach(selector => {
      const elemento = document.querySelector(selector);
      if (elemento && elemento.style.display !== 'none') {
        elemento.style.display = 'none';
        cambiosRealizados = true;
      }
    });
    
    // 2. Ocultar header de "Carpetes"
    const carpetesHeaders = Array.from(
      document.querySelectorAll('div.flex.items-center.select-none.pointer-events-none.my-1')
    ).filter(div => {
      const text = div.textContent.trim();
      return text === 'Carpetes' || text === 'Carpetas';
    });
    carpetesHeaders.forEach(header => {
      if (header.style.display !== 'none') {
        header.style.display = 'none';
        cambiosRealizados = true;
      }
    });
    
    // 3. Eliminar clases del contenedor scroll
    try {
      const div = document.querySelector('ul.m-0.list-none.reset-base.relative.group > div.overflow-y-scroll.no-scrollbar');
      if (div && div.className !== "") {
        div.className = "";
        cambiosRealizados = true;
        console.log('✓ Clases eliminadas del div scroll');
      }
    } catch (e) {
      console.error('❌ Error al eliminar clases:', e);
    }
    
    if (cambiosRealizados) {
      console.log('✓ Sidebar limpiado correctamente');
    }
  }
  
  // Ejecutar inmediatamente
  limpiarSidebar();
  
  // Observador de mutaciones para Vue
  const observer = new MutationObserver(function (mutations) {
    limpiarSidebar(); // Ejecutar en cada cambio del DOM
  });
  
  // Función para iniciar observador
  function iniciarObservador() {
    // Observar #app o el contenedor raíz de Vue
    const appContainer = document.querySelector('#app') || 
                        document.querySelector('#__nuxt') || 
                        document.body;
    
    if (appContainer) {
      observer.observe(appContainer, {
        childList: true,
        subtree: true // ✅ IMPORTANTE: observar todo el árbol
      });
      console.log('✓ Observador Vue activado en:', appContainer);
      limpiarSidebar(); // Ejecutar una vez más después de activar
    } else {
      console.warn('⚠ Contenedor de app no encontrado');
    }
  }
  
  // Iniciar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciarObservador);
  } else {
    iniciarObservador();
  }
  
  // También ejecutar después de un delay para asegurar
  setTimeout(limpiarSidebar, 1000);
  setTimeout(limpiarSidebar, 2000);
  setTimeout(limpiarSidebar, 3000);
  setTimeout(limpiarSidebar, 4000);
  
})();