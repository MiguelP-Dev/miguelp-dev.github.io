---
layout: default
title: HTML Cheat Sheet
description: Hoja de trucos para HTML, incluyendo etiquetas, atributos y ejemplos prácticos.
permalink: /cheat_sheets/htmlcs/
category: cheatsheets
subcategory: html
icon: 🌐
article: true
---

## 1. Estructura Básica de un Documento HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título de la Página</title>
    <link rel="stylesheet" href="estilos.css">
    <script src="script.js"></script>
</head>
<body>
    <!-- Contenido de la página -->
    <h1>Hola Mundo</h1>
    <p>Este es un párrafo en mi página web.</p>
</body>
</html>
```

### Explicación de la Estructura Básica

- `<!DOCTYPE html>`: Declara la versión de HTML (HTML5).
- `<html>`: Elemento raíz que contiene todo el documento HTML.
  - `lang="es"`: Atributo que define el idioma del documento.
- `<head>`: Contiene metainformación y enlaces a recursos externos.
  - `<meta charset="UTF-8">`: Define la codificación de caracteres.
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`: Configuración para dispositivos móviles.
  - `<title>`: Título de la página (aparece en la pestaña del navegador).
  - `<link>`: Enlaza recursos externos como hojas de estilo CSS.
  - `<script>`: Enlaza código JavaScript.
- `<body>`: Contiene todo el contenido visible de la página.
- `<!-- ... -->`: Comentarios en HTML (no visibles en la página).

## 2. Elementos de Texto

### Encabezados

```html
<h1>Encabezado de nivel 1</h1>
<h2>Encabezado de nivel 2</h2>
<h3>Encabezado de nivel 3</h3>
<h4>Encabezado de nivel 4</h4>
<h5>Encabezado de nivel 5</h5>
<h6>Encabezado de nivel 6</h6>
```

### Párrafos y Saltos de Línea

```html
<p>Este es un párrafo de texto. HTML ignora los saltos de línea y espacios múltiples en el código fuente.</p>

<p>Este es otro párrafo. Para crear un salto de línea<br>se utiliza la etiqueta br.</p>

<!-- Para mantener espacios y saltos de línea exactos -->
<pre>
Este texto conserva los    espacios
y los saltos de línea tal como están escritos.
</pre>
```

### Formateo de Texto

```html
<!-- Elementos semánticos (recomendados) -->
<p>Texto con <strong>importancia alta</strong> y <em>énfasis</em>.</p>
<p>Este texto es una <mark>parte destacada</mark> del documento.</p>
<p>Aquí hay un <small>texto pequeño</small> como notas legales.</p>
<p>La fórmula del agua es H<sub>2</sub>O.</p>
<p>10<sup>2</sup> es igual a 100.</p>

<!-- Elementos de presentación (se prefieren los semánticos) -->
<p>Texto en <b>negrita</b>, <i>cursiva</i>, <u>subrayado</u> y <s>tachado</s>.</p>

<!-- Código -->
<p>La función <code>alert()</code> muestra un mensaje en JavaScript.</p>
<pre><code>
function saludar() {
    console.log("Hola mundo");
}
</code></pre>

<!-- Citas -->
<blockquote cite="https://www.ejemplo.com">
    Esta es una cita larga que ocupa varios renglones y se muestra con sangría.
</blockquote>

<p>Como dijo alguien: <q>Una cita corta en línea</q>.</p>

<!-- Abreviaturas -->
<p><abbr title="HyperText Markup Language">HTML</abbr> es un lenguaje de marcado.</p>
```

### Elementos de Separación

```html
<!-- Línea horizontal -->
<hr>

<!-- Salto de línea -->
<br>

<!-- Separador de contenido genérico (no visible) -->
<div>Este es un bloque de contenido</div>
<div>Este es otro bloque de contenido</div>

<!-- Separador de contenido en línea (no visible) -->
<span>Texto en línea</span> con <span>partes separadas</span>.
```

## 3. Listas

### Lista No Ordenada

```html
<ul>
    <li>Elemento 1</li>
    <li>Elemento 2</li>
    <li>Elemento 3
        <ul>
            <li>Subelemento 3.1</li>
            <li>Subelemento 3.2</li>
        </ul>
    </li>
</ul>
```

### Lista Ordenada

```html
<ol>
    <li>Primer paso</li>
    <li>Segundo paso</li>
    <li>Tercer paso</li>
</ol>

<!-- Con atributos -->
<ol start="5" type="I" reversed>
    <li>Empieza en 5 (V en romanos)</li>
    <li>Continúa en 4 (IV en romanos)</li>
</ol>
```

### Lista de Definiciones

```html
<dl>
    <dt>HTML</dt>
    <dd>Lenguaje de marcado para crear páginas web.</dd>
    
    <dt>CSS</dt>
    <dd>Lenguaje para definir el estilo de documentos HTML.</dd>
</dl>
```

## 4. Enlaces

### Enlaces Básicos

```html
<!-- Enlace a otra página -->
<a href="pagina2.html">Ir a la página 2</a>

<!-- Enlace a sitio externo -->
<a href="https://www.ejemplo.com">Visitar Ejemplo.com</a>

<!-- Abrir en nueva pestaña -->
<a href="https://www.ejemplo.com" target="_blank" rel="noopener">Abrir en nueva pestaña</a>

<!-- Enlace a correo electrónico -->
<a href="mailto:usuario@ejemplo.com">Enviar correo</a>

<!-- Enlace a número de teléfono -->
<a href="tel:+123456789">Llamar: +12 345 6789</a>

<!-- Enlace a parte específica de la página (ancla) -->
<a href="#seccion1">Ir a la sección 1</a>

<!-- Destino de ancla -->
<h2 id="seccion1">Sección 1</h2>
```

### Enlaces a Descargas

```html
<a href="documentos/archivo.pdf" download>Descargar PDF</a>

<!-- Especificar nombre para el archivo descargado -->
<a href="documentos/archivo.pdf" download="mi-documento.pdf">Descargar PDF con nombre personalizado</a>
```

## 5. Imágenes y Multimedia

### Imágenes

```html
<!-- Imagen básica -->
<img src="imagen.jpg" alt="Descripción de la imagen">

<!-- Con atributos de tamaño -->
<img src="imagen.jpg" alt="Descripción" width="300" height="200">

<!-- Con título emergente -->
<img src="imagen.jpg" alt="Descripción" title="Título al pasar el ratón">

<!-- Usando figure para imágenes con leyenda -->
<figure>
    <img src="grafico.jpg" alt="Gráfico de estadísticas">
    <figcaption>Fig. 1: Estadísticas de ventas 2023</figcaption>
</figure>
```

### Formatos de imagen comunes

- **JPG/JPEG**: Para fotografías con muchos colores.
- **PNG**: Para imágenes con transparencia y gráficos.
- **GIF**: Para animaciones simples.
- **SVG**: Gráficos vectoriales escalables (ideal para logos y gráficos).
- **WebP**: Formato moderno con buena compresión (menor tamaño).

### Audio

```html
<!-- Reproductor de audio básico -->
<audio src="cancion.mp3" controls></audio>

<!-- Con opciones avanzadas -->
<audio controls autoplay muted loop>
    <source src="cancion.mp3" type="audio/mpeg">
    <source src="cancion.ogg" type="audio/ogg">
    Tu navegador no soporta el elemento audio.
</audio>
```

### Video

```html
<!-- Reproductor de video básico -->
<video src="video.mp4" controls width="640" height="360"></video>

<!-- Con opciones avanzadas -->
<video controls poster="imagen-previa.jpg" width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    Tu navegador no soporta el elemento video.
    <track src="subtitulos.vtt" kind="subtitles" srclang="es" label="Español">
</video>
```

### Incrustación de Contenido

```html
<!-- Iframe para incrustar otra página web -->
<iframe src="https://www.ejemplo.com" width="600" height="400" title="Página de ejemplo"></iframe>

<!-- YouTube -->
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

<!-- Google Maps -->
<iframe src="https://www.google.com/maps/embed?pb=!1m18!..." width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
```

## 6. Tablas

### Tabla Básica

```html
<table>
    <tr>
        <td>Fila 1, Celda 1</td>
        <td>Fila 1, Celda 2</td>
    </tr>
    <tr>
        <td>Fila 2, Celda 1</td>
        <td>Fila 2, Celda 2</td>
    </tr>
</table>
```

### Tabla con Encabezados y Estructura Completa

```html
<table border="1">
    <caption>Título de la tabla</caption>
    
    <thead>
        <tr>
            <th>Encabezado 1</th>
            <th>Encabezado 2</th>
            <th>Encabezado 3</th>
        </tr>
    </thead>
    
    <tbody>
        <tr>
            <td>Dato 1.1</td>
            <td>Dato 1.2</td>
            <td>Dato 1.3</td>
        </tr>
        <tr>
            <td>Dato 2.1</td>
            <td>Dato 2.2</td>
            <td>Dato 2.3</td>
        </tr>
    </tbody>
    
    <tfoot>
        <tr>
            <td colspan="2">Total:</td>
            <td>123</td>
        </tr>
    </tfoot>
</table>
```

### Unión de Celdas

```html
<table border="1">
    <tr>
        <td rowspan="2">Celda que ocupa 2 filas</td>
        <td>Fila 1, Celda 2</td>
    </tr>
    <tr>
        <td>Fila 2, Celda 2</td>
    </tr>
    <tr>
        <td>Fila 3, Celda 1</td>
        <td colspan="2">Celda que ocupa 2 columnas</td>
    </tr>
</table>
```

## 7. Formularios

### Estructura Básica de un Formulario

```html
<form action="/procesar.php" method="post">
    <!-- Elementos del formulario -->
    <input type="text" name="nombre">
    <input type="submit" value="Enviar">
</form>
```

### Campos de Entrada

```html
<!-- Texto de una línea -->
<label for="nombre">Nombre:</label>
<input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre" required>

<!-- Contraseña -->
<label for="password">Contraseña:</label>
<input type="password" id="password" name="password" minlength="8">

<!-- Correo electrónico -->
<label for="email">Email:</label>
<input type="email" id="email" name="email">

<!-- Número -->
<label for="edad">Edad:</label>
<input type="number" id="edad" name="edad" min="18" max="120">

<!-- Teléfono -->
<label for="telefono">Teléfono:</label>
<input type="tel" id="telefono" name="telefono" pattern="[0-9]{9}">

<!-- URL -->
<label for="sitio">Sitio web:</label>
<input type="url" id="sitio" name="sitio">

<!-- Fecha -->
<label for="fecha">Fecha:</label>
<input type="date" id="fecha" name="fecha" min="2023-01-01" max="2023-12-31">

<!-- Hora -->
<label for="hora">Hora:</label>
<input type="time" id="hora" name="hora">

<!-- Color -->
<label for="color">Color favorito:</label>
<input type="color" id="color" name="color">

<!-- Archivo -->
<label for="archivo">Subir archivo:</label>
<input type="file" id="archivo" name="archivo" accept=".pdf,.jpg,.png">
<input type="file" id="archivos" name="archivos" multiple>

<!-- Oculto -->
<input type="hidden" name="id" value="123">

<!-- Rango -->
<label for="puntuacion">Puntuación:</label>
<input type="range" id="puntuacion" name="puntuacion" min="0" max="10" step="1">

<!-- Búsqueda -->
<label for="busqueda">Buscar:</label>
<input type="search" id="busqueda" name="busqueda">
```

### Botones

```html
<!-- Botón de envío -->
<input type="submit" value="Enviar formulario">

<!-- Botón de reset -->
<input type="reset" value="Limpiar formulario">

<!-- Botón general -->
<input type="button" value="Botón simple">

<!-- Elemento button (más flexible para contenido) -->
<button type="submit">
    <img src="icono.png" alt=""> Enviar
</button>

<button type="reset">Reiniciar</button>
<button type="button">Acción personalizada</button>
```

### Opciones de Selección

```html
<!-- Casillas de verificación -->
<fieldset>
    <legend>Intereses:</legend>
    
    <input type="checkbox" id="deportes" name="intereses" value="deportes">
    <label for="deportes">Deportes</label><br>
    
    <input type="checkbox" id="musica" name="intereses" value="musica" checked>
    <label for="musica">Música</label><br>
    
    <input type="checkbox" id="cine" name="intereses" value="cine">
    <label for="cine">Cine</label>
</fieldset>

<!-- Botones de radio -->
<fieldset>
    <legend>Género:</legend>
    
    <input type="radio" id="masculino" name="genero" value="masculino">
    <label for="masculino">Masculino</label><br>
    
    <input type="radio" id="femenino" name="genero" value="femenino">
    <label for="femenino">Femenino</label><br>
    
    <input type="radio" id="otro" name="genero" value="otro">
    <label for="otro">Otro</label>
</fieldset>

<!-- Lista desplegable simple -->
<label for="pais">País:</label>
<select id="pais" name="pais">
    <option value="">Selecciona un país</option>
    <option value="es">España</option>
    <option value="mx">México</option>
    <option value="ar">Argentina</option>
    <option value="co">Colombia</option>
</select>

<!-- Lista desplegable con grupos -->
<label for="coche">Marca de coche:</label>
<select id="coche" name="coche">
    <optgroup label="Europeos">
        <option value="volvo">Volvo</option>
        <option value="audi">Audi</option>
    </optgroup>
    <optgroup label="Americanos">
        <option value="ford">Ford</option>
        <option value="chevrolet">Chevrolet</option>
    </optgroup>
</select>

<!-- Lista de selección múltiple -->
<label for="lenguajes">Lenguajes que dominas:</label>
<select id="lenguajes" name="lenguajes" multiple size="4">
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="js">JavaScript</option>
    <option value="php">PHP</option>
</select>

<!-- Lista de datos sugeridos -->
<label for="navegador">Navegador:</label>
<input list="navegadores" id="navegador" name="navegador">
<datalist id="navegadores">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
</datalist>
```

### Áreas de Texto

```html
<label for="comentario">Comentarios:</label>
<textarea id="comentario" name="comentario" rows="5" cols="40" placeholder="Escribe tus comentarios aquí"></textarea>
```

### Agrupación y Estructura de Formularios

```html
<form action="/procesar.php" method="post">
    <fieldset>
        <legend>Datos personales</legend>
        
        <div>
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required>
        </div>
        
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
    </fieldset>
    
    <fieldset>
        <legend>Preferencias</legend>
        <!-- Contenido del segundo grupo -->
    </fieldset>
    
    <input type="submit" value="Enviar">
</form>
```

## 8. Elementos Semánticos de HTML5

```html
<header>
    <h1>Mi Sitio Web</h1>
    <nav>
        <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <header>
            <h2>Título del Artículo</h2>
            <p>Publicado el <time datetime="2023-06-15">15 de junio de 2023</time></p>
        </header>
        
        <section>
            <h3>Primera Sección</h3>
            <p>Contenido de la primera sección...</p>
        </section>
        
        <section>
            <h3>Segunda Sección</h3>
            <p>Contenido de la segunda sección...</p>
        </section>
        
        <aside>
            <h3>Nota relacionada</h3>
            <p>Información adicional relacionada con el artículo...</p>
        </aside>
        
        <footer>
            <p>Autor: Juan Pérez</p>
        </footer>
    </article>
    
    <aside>
        <h2>Barra Lateral</h2>
        <section>
            <h3>Artículos Populares</h3>
            <ul>
                <li><a href="#">Artículo 1</a></li>
                <li><a href="#">Artículo 2</a></li>
            </ul>
        </section>
    </aside>
</main>

<footer>
    <p>&copy; 2023 Mi Sitio Web</p>
    <address>
        Contacto: <a href="mailto:info@ejemplo.com">info@ejemplo.com</a>
    </address>
</footer>
```

### Elementos Semánticos Importantes

- `<header>`: Encabezado de la página o sección.
- `<nav>`: Menú de navegación.
- `<main>`: Contenido principal, único en la página.
- `<section>`: Sección temática dentro del contenido.
- `<article>`: Contenido independiente y autónomo.
- `<aside>`: Contenido relacionado pero no esencial.
- `<footer>`: Pie de página o sección.
- `<figure>`: Contenido independiente, como imágenes con leyenda.
- `<figcaption>`: Leyenda para el elemento `<figure>`.
- `<time>`: Representa una fecha/hora.
- `<mark>`: Texto destacado.
- `<details>`: Controles adicionales que pueden mostrarse/ocultarse.
- `<summary>`: Título visible para un elemento `<details>`.
- `<address>`: Información de contacto.

## 9. Caracteres Especiales y Entidades HTML

```html
<!-- Caracteres reservados -->
&lt; <!-- < (menor que) -->
&gt; <!-- > (mayor que) -->
&amp; <!-- & (ampersand) -->
&quot; <!-- " (comillas dobles) -->
&apos; <!-- ' (comilla simple) -->

<!-- Espacios -->
&nbsp; <!-- Espacio indivisible -->
&ensp; <!-- Espacio medio -->
&emsp; <!-- Espacio completo -->

<!-- Símbolos comunes -->
&copy; <!-- © (copyright) -->
&reg; <!-- ® (marca registrada) -->
&trade; <!-- ™ (marca comercial) -->
&euro; <!-- € (euro) -->
&pound; <!-- £ (libra) -->
&yen; <!-- ¥ (yen) -->
&sect; <!-- § (sección) -->
&deg; <!-- ° (grado) -->
&plusmn; <!-- ± (más/menos) -->
&times; <!-- × (multiplicación) -->
&divide; <!-- ÷ (división) -->
&ne; <!-- ≠ (no igual) -->
&le; <!-- ≤ (menor o igual) -->
&ge; <!-- ≥ (mayor o igual) -->

<!-- Flechas -->
&larr; <!-- ← (flecha izquierda) -->
&rarr; <!-- → (flecha derecha) -->
&uarr; <!-- ↑ (flecha arriba) -->
&darr; <!-- ↓ (flecha abajo) -->
```

## 10. Atributos Globales

Los atributos globales se pueden usar en cualquier elemento HTML:

```html
<!-- Identificador único -->
<div id="elemento-unico">...</div>

<!-- Clases (múltiples permitidas) -->
<div class="destacado importante">...</div>

<!-- Estilos inline (evitar si es posible, mejor usar CSS) -->
<p style="color: blue; font-size: 16px;">Texto con estilo</p>

<!-- Título (tooltip) -->
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- Idioma -->
<p lang="fr">Bonjour tout le monde</p>

<!-- Dirección del texto -->
<p dir="rtl">هذا نص باللغة العربية</p>

<!-- Visibilidad -->
<div hidden>Este elemento está oculto</div>

<!-- Datos personalizados -->
<div data-usuario="123" data-rol="admin">Contenido</div>

<!-- Habilitar/deshabilitar elementos -->
<button disabled>Botón deshabilitado</button>

<!-- Edición de contenido -->
<p contenteditable="true">Este texto se puede editar</p>

<!-- Arrastrar y soltar -->
<div draggable="true">Elemento arrastrable</div>

<!-- Autocorrección -->
<input type="text" spellcheck="true">

<!-- Orden de tabulación -->
<input type="text" tabindex="1">
<input type="text" tabindex="2">

<!-- Indicar traducción -->
<p translate="no">ACME Inc.</p>
```

## 11. Metadatos y SEO

### Metaetiquetas Básicas

```html
<!-- Juego de caracteres -->
<meta charset="UTF-8">

<!-- Viewport para diseño responsive -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Descripción de la página -->
<meta name="description" content="Descripción de la página para motores de búsqueda (150-160 caracteres)">

<!-- Palabras clave (menos relevantes hoy en día) -->
<meta name="keywords" content="html, css, tutorial, web">

<!-- Autor -->
<meta name="author" content="Nombre del Autor">
```

### Metaetiquetas para SEO y Social Media

```html
<!-- Canonical URL -->
<link rel="canonical" href="https://www.ejemplo.com/pagina-original">

<!-- Robots -->
<meta name="robots" content="index, follow">
<!-- Otras opciones: noindex, nofollow, noarchive, noimageindex -->

<!-- Open Graph (Facebook) -->
<meta property="og:title" content="Título para compartir">
<meta property="og:description" content="Descripción para compartir">
<meta property="og:image" content="https://www.ejemplo.com/imagen.jpg">
<meta property="og:url" content="https://www.ejemplo.com/pagina">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Título para Twitter">
<meta name="twitter:description" content="Descripción para Twitter">
<meta name="twitter:image" content="https://www.ejemplo.com/imagen.jpg">
```

### Favicon y Relaciones

```html
<!-- Favicon básico -->
<link rel="icon" href="favicon.ico">

<!-- Favicons modernos -->
<link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">

<!-- Relaciones de documentos -->
<link rel="stylesheet" href="estilos.css">
<link rel="alternate" href="https://www.ejemplo.com/es" hreflang="es">
<link rel="prev" href="pagina-anterior.html">
<link rel="next" href="pagina-siguiente.html">
```

## 12. Validación y Accesibilidad

### Atributos de Validación para Formularios

```html
<!-- Campos obligatorios -->
<input type="text" required>

<!-- Longitud de texto -->
<input type="text" minlength="3" maxlength="50">

<!-- Rango de números -->
<input type="number" min="0" max="100">

<!-- Patrón (expresión regular) -->
<input type="text" pattern="[A-Za-z]{3,}" title="Solo letras, mínimo 3 caracteres">

<!-- Autocompletar -->
<input type="text" autocomplete="name">
<input type="email" autocomplete="email">
<input type="tel" autocomplete="tel">
```

### Mejores Prácticas de Accesibilidad

```html
<!-- Usar etiquetas adecuadas -->
<label for="nombre">Nombre:</label>
<input type="text" id="nombre" name="nombre">

<!-- Texto alternativo para imágenes -->
<img src="logo.png" alt="Logo de la empresa">

<!-- Roles ARIA -->
<div role="alert">Mensaje importante</div>
<div role="button" tabindex="0">Botón personalizado</div>

<!-- Estados ARIA -->
<div role="tab" aria-selected="true">Pestaña activa</div>
<button aria-expanded="false">Mostrar más</button>

<!-- Navegación por teclado -->
<a href="#contenido" class="skip-link">Saltar al contenido principal</a>

<!-- Estructura jerárquica adecuada -->
<h1>Título principal</h1>
<section>
  <h2>Subtítulo</h2>
  <h3>Título de sección</h3>
</section>

<!-- Lenguaje -->
<html lang="es">
<p lang="en">This is in English</p>
```

## 13. Atributos de Datos Personalizados

```html
<!-- Definición de atributos data-* -->
<div data-usuario-id="123" 
     data-rol="admin" 
     data-ultimo-acceso="2023-06-15">
  Contenido del usuario
</div>

<!-- Acceder desde CSS -->
<style>
  /* Selector de atributo */
  [data-rol="admin"] {
    background-color: #ffeeaa;
  }
</style>

<!-- Acceder desde JavaScript -->
<script>
  const div = document.querySelector('div');
  // Obtener
  const userId = div.dataset.usuarioId; // "123"
  const role = div.dataset.rol; // "admin"
  
  // Asignar
  div.dataset.estado = "activo";
</script>
```

## 14. Ejemplos de Estructuras Comunes

### Página Básica Responsive

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Sitio Web</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>
    <header>
        <h1>Mi Sitio Web</h1>
        <nav>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Servicios</a></li>
                <li><a href="#">Nosotros</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section>
            <h2>Bienvenidos</h2>
            <p>Bienvenidos a nuestro sitio web. Aquí encontrarás toda la información sobre nuestros servicios.</p>
            </section>

        <section>
            <h2>Nuestros Servicios</h2>
            <div class="servicios-grid">
                <article>
                    <h3>Diseño Web</h3>
                    <p>Creamos sitios web modernos y responsive.</p>
                </article>
                <article>
                    <h3>Desarrollo</h3>
                    <p>Programación de aplicaciones web a medida.</p>
                </article>
                <article>
                    <h3>SEO</h3>
                    <p>Optimización para motores de búsqueda.</p>
                </article>
            </div>
        </section>
    </main>

    <aside>
        <h2>Últimas Noticias</h2>
        <ul>
            <li><a href="#">Nueva función disponible</a></li>
            <li><a href="#">Próximo evento: 15 de Mayo</a></li>
        </ul>
    </aside>

    <footer>
        <p>&copy; 2023 Mi Sitio Web. Todos los derechos reservados.</p>
        <address>
            Contacto: <a href="mailto:info@ejemplo.com">info@ejemplo.com</a>
        </address>
    </footer>
</body>
</html>
```

### Tarjeta de Producto

```html
<article class="producto">
    <figure>
        <img src="producto.jpg" alt="Smartphone XYZ">
        <figcaption>Smartphone XYZ - Último modelo</figcaption>
    </figure>
    
    <div class="info">
        <h3>Smartphone XYZ</h3>
        <p>Pantalla 6.5", 128GB, 8GB RAM, Cámara 48MP</p>
        <div class="precio">499€</div>
        <button class="comprar">Añadir al carrito</button>
    </div>
</article>
```

### Formulario de Contacto

```html
<form action="/procesar-contacto" method="post">
    <h2>Contacto</h2>
    <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required>
    </div>
    
    <div class="form-group">
        <label for="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required>
    </div>
    
    <div class="form-group">
        <label for="asunto">Asunto:</label>
        <select id="asunto" name="asunto">
            <option value="consulta">Consulta general</option>
            <option value="soporte">Soporte técnico</option>
            <option value="ventas">Información de ventas</option>
        </select>
    </div>
    
    <div class="form-group">
        <label for="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
    </div>
    
    <div class="form-check">
        <input type="checkbox" id="privacidad" name="privacidad" required>
        <label for="privacidad">Acepto la política de privacidad</label>
    </div>
    
    <button type="submit">Enviar mensaje</button>
</form>
```

### Estructura de Blog

```html
<div class="blog">
    <article class="post">
        <header>
            <h2><a href="articulo1.html">Título del Artículo</a></h2>
            <div class="meta">
                <time datetime="2023-06-15">15 de Junio, 2023</time>
                <span class="autor">por <a href="#">Nombre del Autor</a></span>
                <span class="categoria"><a href="#">Categoría</a></span>
            </div>
        </header>
        
        <div class="contenido">
            <p>Extracto o resumen del artículo...</p>
        </div>
        
        <footer>
            <a href="articulo1.html" class="leer-mas">Leer más</a>
            <div class="tags">
                <a href="#">html</a>
                <a href="#">css</a>
                <a href="#">web</a>
            </div>
        </footer>
    </article>
    
    <!-- Más artículos... -->
    
    <nav class="paginacion">
        <a href="#" class="anterior">&laquo; Anterior</a>
        <a href="#" class="pagina actual">1</a>
        <a href="#" class="pagina">2</a>
        <a href="#" class="pagina">3</a>
        <a href="#" class="siguiente">Siguiente &raquo;</a>
    </nav>
</div>
```

### Galería de Imágenes

```html
<section class="galeria">
    <h2>Nuestra Galería</h2>
    
    <div class="grid-galeria">
        <figure>
            <a href="imagen1-grande.jpg">
                <img src="imagen1-miniatura.jpg" alt="Descripción imagen 1">
            </a>
            <figcaption>Título imagen 1</figcaption>
        </figure>
        
        <figure>
            <a href="imagen2-grande.jpg">
                <img src="imagen2-miniatura.jpg" alt="Descripción imagen 2">
            </a>
            <figcaption>Título imagen 2</figcaption>
        </figure>
        
        <figure>
            <a href="imagen3-grande.jpg">
                <img src="imagen3-miniatura.jpg" alt="Descripción imagen 3">
            </a>
            <figcaption>Título imagen 3</figcaption>
        </figure>
        
        <!-- Más imágenes... -->
    </div>
</section>
```

## 15. API Web y Atributos Avanzados

### Almacenamiento Local y de Sesión

```html
<script>
    // LocalStorage (permanente)
    localStorage.setItem('usuario', 'Juan');
    const usuario = localStorage.getItem('usuario');
    localStorage.removeItem('usuario');
    localStorage.clear(); // Borrar todo
    
    // SessionStorage (solo durante la sesión)
    sessionStorage.setItem('temp', 'valor');
</script>
```

### Geolocalización

```html
<button onclick="obtenerUbicacion()">Obtener mi ubicación</button>

<script>
    function obtenerUbicacion() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(posicion) {
                    const latitud = posicion.coords.latitude;
                    const longitud = posicion.coords.longitude;
                    console.log(`Latitud: ${latitud}, Longitud: ${longitud}`);
                },
                function(error) {
                    console.error("Error al obtener ubicación:", error.message);
                }
            );
        } else {
            console.error("Geolocalización no soportada");
        }
    }
</script>
```

### Notificaciones

```html
<button onclick="mostrarNotificacion()">Mostrar notificación</button>

<script>
    function mostrarNotificacion() {
        // Pedir permiso
        Notification.requestPermission().then(function (permiso) {
            if (permiso === 'granted') {
                // Crear notificación
                const notificacion = new Notification('Título', {
                    body: 'Contenido de la notificación',
                    icon: 'icono.png'
                });
                
                // Evento al hacer clic
                notificacion.onclick = function() {
                    window.focus();
                };
            }
        });
    }
</script>
```

### API Web Workers

```html
<script>
    // Crear un worker
    const worker = new Worker('worker.js');
    
    // Enviar datos al worker
    worker.postMessage({datos: 'información'});
    
    // Recibir resultados del worker
    worker.onmessage = function(e) {
        console.log('Resultados del worker:', e.data);
    };
    
    // Manejar errores
    worker.onerror = function(error) {
        console.error('Error en el worker:', error.message);
    };
    
    // Terminar el worker
    function detenerWorker() {
        worker.terminate();
    }
</script>
```

### API Drag and Drop

```html
<div class="arrastrable" draggable="true" id="elemento">Arrastrame</div>

<div class="zona-soltar" id="destino">Soltar aquí</div>

<script>
    const elemento = document.getElementById('elemento');
    const destino = document.getElementById('destino');
    
    // Configurar elemento arrastrable
    elemento.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.currentTarget.style.opacity = '0.5';
    });
    
    elemento.addEventListener('dragend', function(e) {
        e.currentTarget.style.opacity = '1';
    });
    
    // Configurar zona de destino
    destino.addEventListener('dragover', function(e) {
        e.preventDefault(); // Permitir soltar
        e.currentTarget.classList.add('hover');
    });
    
    destino.addEventListener('dragleave', function(e) {
        e.currentTarget.classList.remove('hover');
    });
    
    destino.addEventListener('drop', function(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('hover');
        
        // Obtener el ID del elemento arrastrado
        const id = e.dataTransfer.getData('text/plain');
        const elementoArrastrado = document.getElementById(id);
        
        // Mover el elemento al destino
        e.currentTarget.appendChild(elementoArrastrado);
    });
</script>
```

## 16. HTML Avanzado y Optimización

### Carga Diferida (Lazy Loading)

```html
<!-- Imágenes con carga diferida -->
<img src="imagen-pequeña.jpg" 
     data-src="imagen-grande.jpg" 
     loading="lazy" 
     alt="Descripción">

<!-- Marcos con carga diferida -->
<iframe src="about:blank" 
        data-src="https://www.youtube.com/embed/VIDEO_ID" 
        loading="lazy"
        title="Video de YouTube"></iframe>

<script>
    // Implementación manual para navegadores antiguos
    document.addEventListener("DOMContentLoaded", function() {
        const lazyElements = document.querySelectorAll("[data-src]");
        
        // Observador de intersección
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.src = element.dataset.src;
                    observer.unobserve(element);
                }
            });
        });
        
        // Observar todos los elementos
        lazyElements.forEach(element => {
            observer.observe(element);
        });
    });
</script>
```

### Integraciones con SVG

```html
<!-- SVG inline -->
<svg width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>

<!-- SVG como imagen -->
<img src="imagen.svg" alt="Imagen SVG">

<!-- SVG con interactividad -->
<svg width="200" height="100" viewBox="0 0 200 100">
    <rect id="rectangulo" x="10" y="10" width="180" height="80" 
          fill="blue" stroke="black" stroke-width="2" />
</svg>

<script>
    const rect = document.getElementById('rectangulo');
    rect.addEventListener('click', function() {
        const currentFill = this.getAttribute('fill');
        this.setAttribute('fill', currentFill === 'blue' ? 'green' : 'blue');
    });
</script>
```

### Contenido Web Components

```html
<!-- Definición de un componente personalizado -->
<template id="mi-componente-template">
    <style>
        :host {
            display: block;
            border: 1px solid #ccc;
            padding: 15px;
            margin: 10px 0;
        }
        .titulo {
            color: #333;
            font-size: 1.2em;
        }
        .contenido {
            margin-top: 10px;
        }
    </style>
    
    <div class="titulo"></div>
    <div class="contenido">
        <slot></slot>
    </div>
</template>

<script>
    class MiComponente extends HTMLElement {
        constructor() {
            super();
            
            // Crear Shadow DOM
            const shadow = this.attachShadow({mode: 'open'});
            const template = document.getElementById('mi-componente-template');
            const clon = template.content.cloneNode(true);
            
            // Configurar el componente
            const titulo = clon.querySelector('.titulo');
            titulo.textContent = this.getAttribute('titulo') || 'Título por defecto';
            
            // Adjuntar al Shadow DOM
            shadow.appendChild(clon);
        }
        
        // Observar cambios en atributos
        static get observedAttributes() {
            return ['titulo'];
        }
        
        attributeChangedCallback(nombre, valorAnterior, nuevoValor) {
            if (nombre === 'titulo' && this.shadowRoot) {
                this.shadowRoot.querySelector('.titulo').textContent = nuevoValor;
            }
        }
    }
    
    // Registrar el componente
    customElements.define('mi-componente', MiComponente);
</script>

<!-- Uso del componente -->
<mi-componente titulo="Mi Primer Componente">
    <p>Este es el contenido dentro del componente personalizado.</p>
</mi-componente>
```

### Script Async y Defer

```html
<!-- Carga normal (bloquea el análisis del HTML) -->
<script src="script-normal.js"></script>

<!-- Async (carga en paralelo, ejecuta cuando termina la carga) -->
<script src="script-async.js" async></script>

<!-- Defer (carga en paralelo, espera a que se analice todo el HTML) -->
<script src="script-defer.js" defer></script>
```

### Atributos de Rendimiento

```html
<!-- Precarga de recursos críticos -->
<link rel="preload" href="fuente-importante.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="estilo-critico.css" as="style">
<link rel="preload" href="script-critico.js" as="script">

<!-- Precarga de recursos que podrían ser necesarios -->
<link rel="prefetch" href="pagina-siguiente.html">
<link rel="prefetch" href="imagen-grande.jpg">

<!-- Preconexión a dominios externos -->
<link rel="preconnect" href="https://api.ejemplo.com">
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- DNS-Prefetch (más ligero que preconnect) -->
<link rel="dns-prefetch" href="https://servicios.ejemplo.com">

<!-- Precarga de páginas -->
<link rel="prerender" href="pagina-probable.html">
```

## 17. Seguridad en HTML

### Prevención de Ataques XSS

```html
<!-- Codificación segura de datos de usuario -->
<div id="comentario"></div>

<script>
    // Función para escapar HTML potencialmente peligroso
    function escapeHTML(texto) {
        return texto
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    // Datos del usuario (por ejemplo, recibidos del servidor)
    const comentarioUsuario = "<script>alert('hacked')</script>";
    
    // Mostrar el comentario de forma segura
    document.getElementById("comentario").textContent = comentarioUsuario; // Método seguro
    // O también:
    document.getElementById("comentario").innerHTML = escapeHTML(comentarioUsuario);
</script>
```

### Content Security Policy (CSP)

```html
<!-- En el servidor (cabecera HTTP) -->
<!-- 
Content-Security-Policy: default-src 'self'; 
                         script-src 'self' https://apis.google.com; 
                         style-src 'self' https://fonts.googleapis.com;
                         img-src 'self' data: https://ejemplo.com
-->

<!-- Alternativa meta tag (menos seguro que la cabecera) -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' https://apis.google.com">
```

### Cross-Origin Resource Sharing (CORS)

```html
<!-- Atributos para recursos de origen cruzado -->

<!-- Para scripts -->
<script src="https://otro-dominio.com/script.js" 
        crossorigin="anonymous"></script>

<!-- Para hojas de estilo -->
<link rel="stylesheet" 
      href="https://otro-dominio.com/styles.css" 
      crossorigin="anonymous">
      
<!-- Para imágenes -->
<img src="https://otro-dominio.com/imagen.jpg" 
     crossorigin="anonymous" 
     alt="Imagen externa">

<!-- Para fuentes web -->
<style>
    @font-face {
        font-family: 'MiFuente';
        src: url('https://fuentes.com/mifuente.woff2') format('woff2');
        font-display: swap;
        font-weight: normal;
        font-style: normal;
    }
</style>
```

### Atributos del Iframe Sandbox

```html
<iframe src="https://otra-web.com" 
        sandbox="allow-scripts allow-same-origin allow-forms" 
        title="Contenido embebido seguro"></iframe>

<!-- 
Opciones de sandbox:
- allow-scripts: Permite ejecutar scripts
- allow-same-origin: Mantiene el mismo origen
- allow-forms: Permite enviar formularios
- allow-popups: Permite ventanas emergentes
- allow-modals: Permite diálogos modales
- allow-downloads: Permite descargas
- allow-popups-to-escape-sandbox: Permite que popups escapen del sandbox
- allow-top-navigation: Permite navegar el frame superior
- allow-orientation-lock: Permite bloquear la orientación de la pantalla
-->
```

## 18. Buenas Prácticas y Convenciones de Codificación

### Estructura y Organización del Código

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <!-- Meta tags y SEO -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Descripción de la página">
    <title>Título de la Página</title>
    
    <!-- Precargas críticas -->
    <link rel="preload" href="fuentes/principal.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/estilos.css">
    
    <!-- Favicon -->
    <link rel="icon" href="favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    
    <!-- Scripts críticos -->
    <script src="js/critical.js" defer></script>
</head>
<body>
    <!-- Estructura del documento organizada por secciones -->
    <header>
        <!-- Contenido del encabezado -->
    </header>
    
    <nav>
        <!-- Menú de navegación -->
    </nav>
    
    <main>
        <section id="inicio">
            <!-- Contenido de la sección inicio -->
        </section>
        
        <section id="servicios">
            <!-- Contenido de la sección servicios -->
        </section>
        
        <!-- Más secciones... -->
    </main>
    
    <aside>
        <!-- Contenido secundario -->
    </aside>
    
    <footer>
        <!-- Contenido del pie de página -->
    </footer>
    
    <!-- Scripts no críticos al final -->
    <script src="js/analytics.js" async></script>
</body>
</html>
```

### Convenciones de Nomenclatura

```html
<!-- Clases descriptivas siguiendo metodología BEM -->
<header class="header">
    <div class="header__logo">
        <img src="logo.png" alt="Logo de la empresa" class="header__logo-img">
    </div>
    
    <nav class="nav header__nav">
        <ul class="nav__list">
            <li class="nav__item nav__item--active">
                <a href="#" class="nav__link">Inicio</a>
            </li>
            <li class="nav__item">
                <a href="#" class="nav__link">Servicios</a>
            </li>
        </ul>
    </nav>
</header>

<!-- IDs únicos con nombres significativos -->
<section id="contact-form-section">
    <form id="contact-form">
        <!-- Contenido del formulario -->
    </form>
</section>

<!-- Atributos data con prefijos -->
<div data-user-id="123" data-user-role="admin">
    <!-- Contenido específico del usuario -->
</div>
```

### Comentarios Significativos

```html
<!-- 
    ENCABEZADO PRINCIPAL
    Contiene logo, navegación y accesos rápidos
-->
<header>
    <!-- Logo y título del sitio -->
    <div class="logo-container">
        <!-- ... -->
    </div>
    
    <!-- 
        Navegación principal 
        Incluye enlaces a las secciones principales
    -->
    <nav>
        <!-- ... -->
    </nav>
    
    <!-- FIXME: El botón de búsqueda no está alineado correctamente -->
    <div class="search">
        <!-- ... -->
    </div>
    
    <!-- TODO: Implementar menú móvil -->
</header>
```

## 19. HTML para PWAs y Aplicaciones Web

### Manifiesto de Aplicación Web

```html
<!-- En el head del documento -->
<link rel="manifest" href="manifest.json">

<!-- Opciones específicas para iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Nombre App">
<link rel="apple-touch-icon" href="icon-152x152.png">

<!-- Opciones para Windows -->
<meta name="msapplication-TileImage" content="icon-144x144.png">
<meta name="msapplication-TileColor" content="#2196f3">

<!-- Tema y color -->
<meta name="theme-color" content="#2196f3">
```

El archivo `manifest.json`:

```json
{
  "name": "Mi Aplicación Web",
  "short_name": "MiApp",
  "description": "Descripción de mi aplicación",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2196f3",
  "orientation": "portrait",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Service Worker (para PWA)

```html
<!-- Registro de Service Worker -->
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('Service Worker registrado con éxito:', registration.scope);
        })
        .catch(function(error) {
          console.log('Error al registrar el Service Worker:', error);
        });
    });
  }
</script>
```

### Aplicaciones Offline

```html
<!-- Para compatibilidad con navegadores antiguos (complemento a Service Workers) -->
<html lang="es" manifest="mi-cache.appcache">

<!-- Lista de verificación de conectividad -->
<div id="estado-conexion">
  Verificando conectividad...
</div>

<script>
  const estadoConexion = document.getElementById('estado-conexion');
  
  function actualizarEstadoConexion() {
    if (navigator.onLine) {
      estadoConexion.textContent = 'Conectado';
      estadoConexion.className = 'online';
    } else {
      estadoConexion.textContent = 'Sin conexión - Modo offline';
      estadoConexion.className = 'offline';
    }
  }
  
  // Verificar estado inicial
  actualizarEstadoConexion();
  
  // Escuchar cambios de conexión
  window.addEventListener('online', actualizarEstadoConexion);
  window.addEventListener('offline', actualizarEstadoConexion);
</script>
```

## 20. Recursos y Referencias

### Validadores y Herramientas

- **Validador W3C**: [https://validator.w3.org/](https://validator.w3.org/)
- **Validador de Accesibilidad WAVE**: [https://wave.webaim.org/](https://wave.webaim.org/)
- **Lighthouse** (en Chrome DevTools): Para auditorías de rendimiento, accesibilidad, SEO y PWA
- **HTML5 Outliner**: [https://gsnedders.html5.org/outliner/](https://gsnedders.html5.org/outliner/)

### Documentación Oficial

- **MDN Web Docs**: [https://developer.mozilla.org/es/docs/Web/HTML](https://developer.mozilla.org/es/docs/Web/HTML)
- **W3C HTML5**: [https://www.w3.org/TR/html5/](https://www.w3.org/TR/html5/)
- **WHATWG Living Standard**: [https://html.spec.whatwg.org/](https://html.spec.whatwg.org/)
