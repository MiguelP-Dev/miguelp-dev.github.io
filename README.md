# DevSphere

![Logo](assets/images/logo.png)

**DevSphere** es mi bitácora técnica y de aprendizaje, donde documento recursos, guías, ejemplos y conceptos clave de desarrollo de software. El sitio está diseñado con un enfoque minimalista, elegante y altamente personalizable, pensado para consulta rápida y referencia profesional.

---

## 🚩 Navegación y Estructura

El sitio está organizado en secciones temáticas accesibles desde la barra lateral y la página principal:

- **Inicio:** Vista general y acceso rápido a las secciones principales.
- **Sobre Mí:** Información personal y contexto del autor.
- **Conceptos:** Explicaciones y resúmenes de algoritmos, arquitecturas y fundamentos de desarrollo.
- **Lecciones:** Cursos y apuntes extensos sobre JavaScript, TypeScript, Go, Kubernetes, CI/CD, contenedores, YAML y más.
- **Ejemplos:** Snippets y ejemplos prácticos en Go y pseudocódigo para resolver problemas comunes.
- **Hojas de Referencia:** Cheat sheets y listas de comandos para SCSS, HTML, Liquid, Jenkins, JavaScript, Jekyll, validadores y más.
- **Paquetes:** Documentación y ejemplos de uso de paquetes estándar y avanzados de Go.
- **Librerías:** Recursos y utilidades listos para implementar, organizados para consulta rápida.

La navegación principal se gestiona desde la barra lateral (configurada en `_data/sections.yml`) y la barra superior, ambas presentes en todas las páginas.

---

## 🛠️ Tecnologías Utilizadas

- **[Jekyll](https://jekyllrb.com/):** Motor de sitio estático.
- **[GitHub Pages](https://pages.github.com/):** Hospedaje.
- **[SASS/SCSS](https://sass-lang.com/):** Preprocesador CSS.
- **[Mermaid](https://mermaid-js.github.io/):** Diagramas y gráficos.
- **[Highlight.js](https://highlightjs.org/):** Resaltado de sintaxis para bloques de código.

---

## 🎨 Personalización del Tema

El tema es completamente personalizable desde los archivos SCSS:

- **Colores:** Modifica la paleta en `_sass/_colors.scss`.
- **Variables globales:** Ajusta tipografías, espaciados y colores en `_sass/_variables.scss`.

Todos los componentes y páginas usan estas variables, así que cualquier cambio es global y sencillo.

---

## 📦 Estructura del Proyecto

```plaintext
.
├── _config.yml          # Configuración de Jekyll y plugins
├── _layouts/            # Plantillas base (default, section)
├── _includes/           # Componentes reutilizables (navbar, sidebar, footer, botón GitHub, etc.)
├── _pages/              # Secciones temáticas y subtemas (lessons, examples, concepts, packages, library, cheat_sheets)
├── _sass/               # Estilos SCSS y variables de tema
├── assets/              # Recursos estáticos (imágenes, CSS, JS)
├── _data/               # Datos estructurados para navegación y secciones
├── index.html           # Página principal
└── Gemfile              # Dependencias Ruby/Jekyll
```

---

## ✨ Características Destacadas

- **Tema claro, elegante y minimalista:** Paleta neutra, alto contraste suave, sin negros/blancos puros.
- **Tipografía profesional:** Roboto para texto, Fira Mono/Consolas para código.
- **Botón flotante de GitHub:** Animado, con efecto glow y adaptado al tema.
- **Bloques de código destacados:** Fondo suave, fuente monoespaciada y resaltado de sintaxis.
- **Navbar y sidebar responsivas:** Navegación clara y accesible en cualquier dispositivo.
- **Estructura modular:** Fácil de extender y mantener.
- **Diagramas Mermaid integrados:** Personalización visual coherente con el tema.
- **Personalización sencilla:** Cambia colores y variables en un solo lugar.

---

## 🚀 Instalación Local

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Miguelp-Dev/miguelp-dev.github.io.git
   ```

2. Instala las dependencias:

   ```bash
   bundle install
   ```

3. Ejecuta el servidor local:

   ```bash
   bundle exec jekyll serve
   ```

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

- **Miguel Portillo** - [GitHub](https://github.com/Miguelp-Dev)
- Email: <miguelportillo2475@gmail.com>

---

## 🌐 Sitio Web

Visita la bitácora en: [https://miguelp-dev.github.io](https://miguelp-dev.github.io)
