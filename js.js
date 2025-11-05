// ============================================
// SCRIPT PARA OCULTAR ELEMENTOS DEL SIDEBAR
// ============================================

(function() {
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
    
    if (cambiosRealizados) {
      console.log('✓ Sidebar limpiado correctamente');
    }
  }
  
  // Ejecutar inmediatamente
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', limpiarSidebar);
  } else {
    limpiarSidebar();
  }
  
  // Observador de mutaciones para aplicaciones SPA (Vue/React)
  const observer = new MutationObserver(function(mutations) {
    let necesitaLimpieza = false;
    
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Verificar si se agregaron elementos que necesitan ocultarse
            if (node.matches && (
                node.matches('li[name="Unattended"]') ||
                (node.querySelector && node.querySelector('span.i-lucide-folder'))
            )) {
              necesitaLimpieza = true;
            }
          }
        });
      }
    });
    
    if (necesitaLimpieza) {
      setTimeout(limpiarSidebar, 50);
    }
  });
  
  // Observar el contenedor del sidebar
  setTimeout(() => {
    const sidebarContainer = document.querySelector('ul.sidebar-group-children');
    if (sidebarContainer) {
      observer.observe(sidebarContainer, {
        childList: true,
        subtree: true
      });
      console.log('✓ Observador del sidebar activado');
    }
  }, 100);
  
})();