// ============================================
// SCRIPT PARA MODIFICAR SIDEBAR POST-RENDERING
// ============================================

(function() {
  'use strict';
  
  // Función para aplicar los cambios
  function modificarSidebar() {
    // 1. Buscar el header de "Carpetes" (o "Carpetas")
    const carpetesHeader = Array.from(
      document.querySelectorAll('div.flex.items-center.select-none.pointer-events-none.my-1')
    ).find(div => {
      const text = div.textContent.trim();
      return text === 'Carpetes' || text === 'Carpetas';
    });
    
    if (carpetesHeader) {
      // 2. Buscar el icono de folder dentro del header
      const folderIcon = carpetesHeader.querySelector('span.i-lucide-folder');
      
      if (folderIcon) {
        // 3. Crear el nuevo icono de message-circle
        const messageIcon = document.createElement('span');
        messageIcon.className = 'i-lucide-message-circle size-4 injected-icon';
        
        // 4. Reemplazar el icono de folder por el de message-circle
        folderIcon.parentNode.replaceChild(messageIcon, folderIcon);
        
        console.log('✓ Icono de Carpetes reemplazado por message-circle');
      }
    } else {
      console.warn('⚠ No se encontró el header de Carpetes/Carpetas');
    }
  }
  
  // Ejecutar inmediatamente si el DOM ya está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', modificarSidebar);
  } else {
    modificarSidebar();
  }
  
  // Observador de mutaciones para detectar cambios dinámicos en el sidebar
  // (útil si la aplicación usa Vue/React y re-renderiza el sidebar)
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes.length > 0) {
        // Verificar si se agregó el header de Carpetes
        const needsUpdate = Array.from(mutation.addedNodes).some(node => {
          if (node.nodeType === 1) { // Element node
            return node.querySelector && 
                   node.querySelector('span.i-lucide-folder');
          }
          return false;
        });
        
        if (needsUpdate) {
          setTimeout(modificarSidebar, 100);
        }
      }
    });
  });
  
  // Observar cambios en el sidebar
  const sidebarContainer = document.querySelector('li.grid.gap-1.text-sm.cursor-pointer.select-none');
  if (sidebarContainer) {
    observer.observe(sidebarContainer, {
      childList: true,
      subtree: true
    });
  }
  
  console.log('✓ Script de modificación del sidebar cargado');
})();