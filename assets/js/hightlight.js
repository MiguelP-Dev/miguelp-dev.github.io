document.addEventListener('DOMContentLoaded', (event) => {
    // Inicializar Highlight.js
      document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
      });

    // También puede ser necesario procesar bloques pre existentes de Rouge
      document.querySelectorAll('div.highlight pre.highlight').forEach((block) => {
      // Determinar el lenguaje desde la clase del contenedor padre
      const parent = block.closest('[class*="language-"]');
      let language = null;
      
      if (parent) {
          const classes = parent.className.split(' ');
          for (const cls of classes) {
          if (cls.startsWith('language-')) {
            language = cls.substring(9); // Extraer el nombre del lenguaje
              break;
          }
          }
      }
      
      // Crear un nuevo elemento code
      const code = document.createElement('code');
      if (language) {
          code.className = `language-${language}`;
      }
      
      // Copiar el contenido y reemplazar spans
      code.innerHTML = block.innerHTML;
      
      // Reemplazar el contenido del pre
      block.innerHTML = '';
      block.appendChild(code);
      
      // Resaltar con highlight.js
      hljs.highlightBlock(code);
      });

      // Inicializar Mermaid
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default', // Puedes usar 'dark', 'forest', 'neutral', etc.
        securityLevel: 'loose'
      });
  });