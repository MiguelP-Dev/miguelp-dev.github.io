document.addEventListener('DOMContentLoaded', (event) => {
  // Configuración de Highlight.js
  hljs.configure({
    languages: ['liquid', 'javascript', 'html', 'css', 'scss', 'yaml'],
    useBR: false,
    tabReplace: '  ', // 2 espacios para tabs
    ignoreUnescapedHTML: true // Seguridad adicional
  });

  // Función para procesar bloques de código
  const processCodeBlocks = (block) => {
    // Determinar el lenguaje
    let language = 'liquid'; // Valor por defecto para Jekyll/Liquid
    
    // Buscar en las clases del bloque
    if (block.className) {
      const match = block.className.match(/language-(\w+)/);
      if (match) language = match[1];
    }
    
    // Buscar en el contenedor padre si no se encontró en el bloque
    const parent = block.closest('[class*="language-"]');
    if (parent && !language) {
      const classes = parent.className.split(' ');
      for (const cls of classes) {
        if (cls.startsWith('language-')) {
          language = cls.substring(9);
          break;
        }
      }
    }

    // Crear nuevo elemento code si es necesario (para bloques Rouge)
    if (block.tagName === 'PRE') {
      const code = document.createElement('code');
      code.className = `language-${language} hljs`;
      code.innerHTML = block.innerHTML;
      block.innerHTML = '';
      block.appendChild(code);
      return code;
    } else {
      block.className = `language-${language} hljs`;
      return block;
    }
  };

  // Procesar todos los bloques de código estándar
  document.querySelectorAll('pre code').forEach((block) => {
    const codeElement = processCodeBlocks(block);
    hljs.highlightElement(codeElement);
  });

  // Procesar bloques generados por Rouge
  document.querySelectorAll('div.highlight pre').forEach((block) => {
    const codeElement = processCodeBlocks(block);
    hljs.highlightElement(codeElement);
  });

  // Inicializar Mermaid (si está cargado)
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      }
    });
  }

  // Añadir botón de copiar a los bloques de código
  document.querySelectorAll('pre').forEach((block) => {
    // Crear botón
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-code-btn';
    copyBtn.title = 'Copiar código';
    copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
    
    // Posicionar botón
    block.style.position = 'relative';
    copyBtn.style.position = 'absolute';
    copyBtn.style.top = '8px';
    copyBtn.style.right = '8px';
    copyBtn.style.background = 'transparent';
    copyBtn.style.border = 'none';
    copyBtn.style.cursor = 'pointer';
    copyBtn.style.color = '#D8DEE9'; // nord4
    copyBtn.style.opacity = '0.6';
    copyBtn.style.transition = 'opacity 0.2s';
    
    copyBtn.addEventListener('mouseenter', () => {
      copyBtn.style.opacity = '1';
    });
    
    copyBtn.addEventListener('mouseleave', () => {
      copyBtn.style.opacity = '0.6';
    });
    
    copyBtn.addEventListener('click', () => {
      const code = block.querySelector('code') || block;
      navigator.clipboard.writeText(code.textContent).then(() => {
        copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        setTimeout(() => {
          copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>';
        }, 2000);
      });
    });
    
    block.appendChild(copyBtn);
  });
});